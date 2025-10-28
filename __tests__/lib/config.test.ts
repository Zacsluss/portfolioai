import { API_CONFIG, APP_CONFIG } from '@/lib/config'

describe('Configuration', () => {
  describe('API_CONFIG', () => {
    it('should have rate limit configuration', () => {
      expect(API_CONFIG.RATE_LIMIT).toBeDefined()
      expect(API_CONFIG.RATE_LIMIT.MAX_REQUESTS).toBeGreaterThan(0)
      expect(API_CONFIG.RATE_LIMIT.WINDOW_MS).toBeGreaterThan(0)
    })

    it('should have input validation limits', () => {
      expect(API_CONFIG.INPUT).toBeDefined()
      expect(API_CONFIG.INPUT.MAX_LENGTH).toBe(2000)
      expect(API_CONFIG.INPUT.MAX_MESSAGES).toBe(50)
      expect(API_CONFIG.INPUT.MIN_MESSAGES).toBe(1)
    })

    it('should have upload configuration', () => {
      expect(API_CONFIG.UPLOAD).toBeDefined()
      expect(API_CONFIG.UPLOAD.MAX_AUDIO_SIZE).toBe(25 * 1024 * 1024) // 25MB
      expect(API_CONFIG.UPLOAD.ALLOWED_AUDIO_TYPES).toBeInstanceOf(Array)
      expect(API_CONFIG.UPLOAD.ALLOWED_AUDIO_TYPES.length).toBeGreaterThan(0)
    })

    it('should include common audio types', () => {
      const audioTypes = API_CONFIG.UPLOAD.ALLOWED_AUDIO_TYPES
      expect(audioTypes).toContain('audio/webm')
      expect(audioTypes).toContain('audio/mp4')
      expect(audioTypes).toContain('audio/mpeg')
      expect(audioTypes).toContain('audio/wav')
      expect(audioTypes).toContain('audio/ogg')
    })
  })

  describe('APP_CONFIG', () => {
    it('should have message history limit', () => {
      expect(APP_CONFIG.MAX_MESSAGE_HISTORY).toBeGreaterThan(0)
    })

    it('should have OpenAI key prefix', () => {
      expect(APP_CONFIG.OPENAI_KEY_PREFIX).toBe('sk-')
    })
  })

  describe('Configuration immutability', () => {
    it('should not allow modification of API_CONFIG', () => {
      expect(() => {
        // @ts-expect-error - Testing immutability
        API_CONFIG.RATE_LIMIT.MAX_REQUESTS = 999
      }).toThrow()
    })

    it('should not allow modification of APP_CONFIG', () => {
      expect(() => {
        // @ts-expect-error - Testing immutability
        APP_CONFIG.MAX_MESSAGE_HISTORY = 999
      }).toThrow()
    })
  })
})
