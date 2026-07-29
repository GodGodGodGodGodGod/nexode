import type {
  GatewayRequest,
} from '../types/index.js';

export interface RateLimitOptions {
  readonly windowMs: number;

  readonly maxRequests: number;

  keyGenerator?(
    request: GatewayRequest,
  ): string;
}

export interface RateLimitResult {
  readonly allowed: boolean;

  readonly remaining: number;

  readonly resetAt: Date;
}