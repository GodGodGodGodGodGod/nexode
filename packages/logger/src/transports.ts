import type { LogEntry } from './types.js';

export interface LogTransport {
  write(entry: LogEntry): void;
}
export class ConsoleTransport implements LogTransport {
  write(entry: LogEntry): void {
    console.log(entry.message);
  }
}