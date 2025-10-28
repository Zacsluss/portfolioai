import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { logger } from '@/lib/logger';
import { API_CONFIG } from '@/lib/config';

// Initialize OpenAI client lazily to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Invalid request: audio file required' },
        { status: 400 }
      );
    }

    // Validate file size (max 25MB for Whisper API)
    if (audioFile.size > API_CONFIG.UPLOAD.MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB.' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!API_CONFIG.UPLOAD.ALLOWED_AUDIO_TYPES.includes(audioFile.type)) {
      return NextResponse.json(
        { error: 'Invalid audio format. Supported: webm, mp4, mpeg, wav, ogg' },
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

    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en', // Can be made dynamic
      response_format: 'json',
    });

    return NextResponse.json({
      text: transcription.text,
    });

  } catch (error: unknown) {
    logger.error('Transcription API error:', error);

    if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
      logger.error('OpenAI API Authentication Error');
      return NextResponse.json(
        { error: 'Invalid API key configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred transcribing audio' },
      { status: 500 }
    );
  }
}
