import { logger } from '@/lib/logger'

describe('Logger', () => {
  let consoleSpy: {
    log: jest.SpyInstance
    warn: jest.SpyInstance
    error: jest.SpyInstance
    debug: jest.SpyInstance
  }

  beforeEach(() => {
    // Spy on console methods
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
      debug: jest.spyOn(console, 'debug').mockImplementation(),
    }
  })

  afterEach(() => {
    // Restore console methods
    Object.values(consoleSpy).forEach((spy) => spy.mockRestore())
  })

  describe('info()', () => {
    it('should log info messages in test environment', () => {
      logger.info('Test info message')
      expect(consoleSpy.log).toHaveBeenCalledWith('[INFO]', 'Test info message', '')
    })

    it('should log info messages with context', () => {
      const context = { userId: '123', action: 'login' }
      logger.info('User logged in', context)
      expect(consoleSpy.log).toHaveBeenCalledWith('[INFO]', 'User logged in', context)
    })
  })

  describe('warn()', () => {
    it('should log warning messages', () => {
      logger.warn('Test warning')
      expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN]', 'Test warning', '')
    })

    it('should log warning messages with context', () => {
      const context = { code: 'DEPRECATION' }
      logger.warn('Feature deprecated', context)
      expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN]', 'Feature deprecated', context)
    })

    it('should always log warnings regardless of environment', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      logger.warn('Production warning')
      expect(consoleSpy.warn).toHaveBeenCalled()

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('error()', () => {
    it('should log error messages', () => {
      logger.error('Test error')
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR]', 'Test error', '', '')
    })

    it('should log error messages with Error object', () => {
      const error = new Error('Something went wrong')
      logger.error('Test error', error)
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR]', 'Test error', error, '')
    })

    it('should log error messages with context', () => {
      const error = new Error('Failed')
      const context = { userId: '123' }
      logger.error('Operation failed', error, context)
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR]', 'Operation failed', error, context)
    })

    it('should always log errors regardless of environment', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      logger.error('Production error')
      expect(consoleSpy.error).toHaveBeenCalled()

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('debug()', () => {
    it('should log debug messages in test environment', () => {
      logger.debug('Debug message')
      expect(consoleSpy.debug).toHaveBeenCalledWith('[DEBUG]', 'Debug message', '')
    })

    it('should log debug messages with context', () => {
      const context = { step: 1, data: 'test' }
      logger.debug('Debug step', context)
      expect(consoleSpy.debug).toHaveBeenCalledWith('[DEBUG]', 'Debug step', context)
    })
  })

  describe('log()', () => {
    it('should log info level messages', () => {
      logger.log('info', 'Info via log')
      expect(consoleSpy.log).toHaveBeenCalledWith('[INFO]', 'Info via log', '')
    })

    it('should log warn level messages', () => {
      logger.log('warn', 'Warning via log')
      expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN]', 'Warning via log', '')
    })

    it('should log error level messages', () => {
      logger.log('error', 'Error via log')
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR]', 'Error via log', undefined, '')
    })

    it('should log debug level messages', () => {
      logger.log('debug', 'Debug via log')
      expect(consoleSpy.debug).toHaveBeenCalledWith('[DEBUG]', 'Debug via log', '')
    })

    it('should log with context', () => {
      const context = { test: true }
      logger.log('info', 'Message with context', context)
      expect(consoleSpy.log).toHaveBeenCalledWith('[INFO]', 'Message with context', context)
    })
  })

  describe('Environment behavior', () => {
    it('should behave correctly in test environment', () => {
      expect(process.env.NODE_ENV).toBe('test')

      // Info and debug should log in test (treated as development)
      logger.info('Test info')
      expect(consoleSpy.log).toHaveBeenCalled()

      logger.debug('Test debug')
      expect(consoleSpy.debug).toHaveBeenCalled()
    })
  })
})
