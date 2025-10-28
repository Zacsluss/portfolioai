import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { assistantConfig } from '@/lib/assistant-context';
import { logger } from '@/lib/logger';

// Initialize OpenAI client lazily to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: text string required' },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      logger.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Get OpenAI client
    const openai = getOpenAIClient();

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: assistantConfig.voiceModel,
      voice: assistantConfig.voiceOption,
      input: text,
      speed: 1.0,
    });

    // Convert response to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error: unknown) {
    logger.error('TTS API error:', error);

    if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
      logger.error('OpenAI API Authentication Error');
      return NextResponse.json(
        { error: 'Invalid API key configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred generating speech' },
      { status: 500 }
    );
  }
}
