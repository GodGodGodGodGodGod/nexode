import { formatLog } from './formatter.js';
import { ConsoleTransport } from './transports.js';
import type { LogContext, LogEntry, LogLevel, Logger } from './types.js';

const transport = new ConsoleTransport();

class NexodeLogger implements Logger {
  private log(level: LogLevel, message: string, context?: LogContext): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };

    transport.write({
      ...entry,
      message: formatLog(entry),
    });
  }

  trace(message: string, context?: LogContext): void {
    this.log('trace', message, context);
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  fatal(message: string, context?: LogContext): void {
    this.log('fatal', message, context);
  }
}

export const logger = new NexodeLogger();