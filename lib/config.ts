/**
 * Application configuration constants
 * Centralizes magic numbers and configuration values
 */

export const API_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  },

  // Input validation
  INPUT: {
    MAX_LENGTH: parseInt(process.env.MAX_INPUT_LENGTH || '2000'),
    MAX_MESSAGES: 50,
    MIN_MESSAGES: 1,
  },

  // File upload limits
  UPLOAD: {
    MAX_AUDIO_SIZE: 25 * 1024 * 1024, // 25MB
    ALLOWED_AUDIO_TYPES: ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/wav', 'audio/ogg'],
  },
} as const;

export const APP_CONFIG = {
  // Message history
  MAX_MESSAGE_HISTORY: parseInt(process.env.NEXT_PUBLIC_MAX_MESSAGE_HISTORY || '50'),

  // API Keys validation
  OPENAI_KEY_PREFIX: 'sk-',
} as const;
