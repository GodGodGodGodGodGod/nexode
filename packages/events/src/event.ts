import type { BaseEvent } from './types.js';

export function createEvent<T>(
  name: string,
  payload: T,
  source: string,
  version = '1.0'
): BaseEvent<T> {
  return {
    name,
    payload,
    metadata: {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source,
      version,
    },
  };
}