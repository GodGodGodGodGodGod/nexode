import type {
  LogEntry,
} from './logEntry.js';

export interface LogProvider {
  log(
    entry: LogEntry,
  ): void | Promise<void>;
}