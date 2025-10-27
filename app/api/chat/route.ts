import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { generateSystemPrompt, assistantConfig } from '@/lib/assistant-context';

// Initialize OpenAI client lazily to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  });
}

/**
 * Sanitize user input to prevent injection attacks
 * Removes potentially dangerous characters and limits length
 */
function sanitizeInput(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Limit length to prevent abuse
  const maxLength = 2000;
  let sanitized = text.slice(0, maxLength);

  // Remove null bytes and other control characters
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');

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
    if (messages.length === 0 || messages.length > 50) {
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
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
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
          console.error('Streaming error:', error);
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
    console.error('Chat API error:', error);

    if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}
