import type {
  LogLevel,
} from './logLevel.js';

export interface Logger {
  log(
    level: LogLevel,
    message: string,
    context?: Record<
      string,
      unknown
    >,
  ): Promise<void>;
}