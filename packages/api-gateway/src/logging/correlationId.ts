import crypto from 'node:crypto';

export function createCorrelationId(): string {
  return crypto.randomUUID();
}