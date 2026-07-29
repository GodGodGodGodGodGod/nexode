import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  RateLimitResult,
  RateLimitOptions,
} from './types.js';

export interface RateLimiter {
  limit(
    request: GatewayRequest,
    options: RateLimitOptions,
  ): Promise<RateLimitResult>;
}