import type { LogEntry } from './types.js';

export function formatLog(entry: LogEntry): string {
  return JSON.stringify(entry);
}