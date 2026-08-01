export interface SessionOptions {
  readonly idleTimeoutMs: number;

  readonly absoluteTimeoutMs: number;

  readonly allowMultipleSessions: boolean;
}