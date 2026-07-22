import type { LogLevel } from './types.js';

export const LOG_LEVELS: readonly LogLevel[] = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
] as const;