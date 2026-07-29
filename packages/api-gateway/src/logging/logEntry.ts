import type {
  LogLevel,
} from './logLevel.js';

export interface LogEntry {
  readonly level: LogLevel;

  readonly message: string;

  readonly timestamp: Date;

  readonly context?: Record<
    string,
    unknown
  >;
}