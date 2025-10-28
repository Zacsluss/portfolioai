/**
 * Application configuration constants
 * Centralizes magic numbers and configuration values
 */

/**
 * Deep freezes an object to make it immutable at runtime
 */
function deepFreeze<T extends Record<string, unknown>>(obj: T): T {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop as keyof T];
    if (value && typeof value === 'object') {
      deepFreeze(value as Record<string, unknown>);
    }
  });
  return obj;
}

export const API_CONFIG = deepFreeze({
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
} as const);

export const APP_CONFIG = deepFreeze({
  // Message history
  MAX_MESSAGE_HISTORY: parseInt(process.env.NEXT_PUBLIC_MAX_MESSAGE_HISTORY || '50'),

  // API Keys validation
  OPENAI_KEY_PREFIX: 'sk-',
} as const);
