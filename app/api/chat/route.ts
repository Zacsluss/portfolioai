import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { generateSystemPrompt, assistantConfig } from '@/lib/assistant-context';
import { logger } from '@/lib/logger';
import { API_CONFIG } from '@/lib/config';

// Initialize OpenAI client lazily to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  });
}

/**
 * Sanitize user input to prevent injection attacks
 * Removes potentially dangerous characters and limits length
 * @param text - The input text to sanitize
 * @returns Sanitized and safe text string
 */
function sanitizeInput(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Limit length to prevent abuse
  let sanitized = text.slice(0, API_CONFIG.INPUT.MAX_LENGTH);

  // Remove null bytes and other control characters
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if request from IP address has exceeded rate limit
 * @param ip - Client IP address
 * @returns Object indicating if request is allowed and remaining quota
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = API_CONFIG.RATE_LIMIT.MAX_REQUESTS;
  const windowMs = API_CONFIG.RATE_LIMIT.WINDOW_MS;

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') ||
               req.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: { 'X-RateLimit-Remaining': '0' }
        }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    // Validate and sanitize messages
    if (messages.length === 0 || messages.length > API_CONFIG.INPUT.MAX_MESSAGES) {
      return NextResponse.json(
        { error: 'Invalid message count' },
        { status: 400 }
      );
    }

    // Sanitize all message content
    const sanitizedMessages: ChatCompletionMessageParam[] = messages
      .map((msg: { role?: string; content?: string }) => {
        const role = (msg.role === 'user' || msg.role === 'assistant' ? msg.role : 'user') as 'user' | 'assistant';
        return {
          role,
          content: sanitizeInput(msg.content || ''),
        };
      })
      .filter((msg) => msg.content.length > 0);

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      logger.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Service configuration error: API key not found. Please check server configuration.' },
        { status: 503 }
      );
    }

    // Validate API key format
    if (!process.env.OPENAI_API_KEY.startsWith(API_CONFIG.OPENAI_KEY_PREFIX)) {
      logger.error('OPENAI_API_KEY has invalid format (should start with sk-)');
      return NextResponse.json(
        { error: 'Service configuration error: Invalid API key format.' },
        { status: 503 }
      );
    }

    // Generate system prompt with portfolio context
    const systemPrompt = generateSystemPrompt();

    // Get OpenAI client
    const openai = getOpenAIClient();

    // Call OpenAI API with streaming
    const response = await openai.chat.completions.create({
      model: assistantConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitizedMessages,
      ],
      temperature: assistantConfig.temperature,
      max_tokens: assistantConfig.maxTokens,
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          logger.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      },
    });

  } catch (error: unknown) {
    logger.error('Chat API error:', error);

    // Enhanced error handling with specific messages
    if (error && typeof error === 'object') {
      // Check for OpenAI-specific errors
      if ('status' in error) {
        const status = error.status as number;

        if (status === 401) {
          logger.error('OpenAI API Authentication Error: Invalid API key');
          return NextResponse.json(
            { error: 'Invalid API key configuration. Please check your OpenAI API key.' },
            { status: 500 }
          );
        }

        if (status === 429) {
          logger.error('OpenAI API Rate Limit Error');
          return NextResponse.json(
            { error: 'OpenAI API rate limit exceeded. Please try again in a moment.' },
            { status: 429 }
          );
        }

        if (status === 500 || status === 503) {
          logger.error('OpenAI API Server Error');
          return NextResponse.json(
            { error: 'OpenAI service is temporarily unavailable. Please try again later.' },
            { status: 503 }
          );
        }

        if (status === 400) {
          logger.error('OpenAI API Bad Request:', 'message' in error ? error.message : 'Unknown error');
          return NextResponse.json(
            { error: 'Invalid request to AI service. Please try a different message.' },
            { status: 400 }
          );
        }
      }

      // Check for insufficient quota error
      if ('message' in error && typeof error.message === 'string') {
        if (error.message.includes('insufficient_quota') || error.message.includes('quota')) {
          logger.error('OpenAI API Quota Error:', error.message);
          return NextResponse.json(
            { error: 'OpenAI account has insufficient quota. Please check your billing settings.' },
            { status: 402 }
          );
        }

        // Log the actual error message for debugging
        logger.error('OpenAI API Error Message:', error.message);
      }
    }

    // Generic fallback error
    return NextResponse.json(
      { error: 'An error occurred processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
