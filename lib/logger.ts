/**
 * Production-ready logging utility
 * Conditionally logs based on environment
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log informational messages (development only)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log('[INFO]', message, context || '');
    }
  }

  /**
   * Log warning messages (all environments)
   */
  warn(message: string, context?: LogContext): void {
    console.warn('[WARN]', message, context || '');
  }

  /**
   * Log error messages (all environments)
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    console.error('[ERROR]', message, error || '', context || '');
  }

  /**
   * Log debug messages (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug('[DEBUG]', message, context || '');
    }
  }

  /**
   * Generic log method with level
   */
  log(level: LogLevel, message: string, context?: LogContext): void {
    switch (level) {
      case 'info':
        this.info(message, context);
        break;
      case 'warn':
        this.warn(message, context);
        break;
      case 'error':
        this.error(message, undefined, context);
        break;
      case 'debug':
        this.debug(message, context);
        break;
    }
  }
}

// Export singleton instance
export const logger = new Logger();
