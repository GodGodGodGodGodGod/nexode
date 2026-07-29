import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  RateLimiter,
} from './rateLimiter.js';

import type {
  RateLimitOptions,
  RateLimitResult,
} from './types.js';

import type {
  RateLimitStore,
} from './rateLimitStore.js';

export class FixedWindowLimiter
  implements RateLimiter {

  constructor(
    private readonly store: RateLimitStore,
  ) {}

  async limit(
    request: GatewayRequest,
    options: RateLimitOptions,
  ): Promise<RateLimitResult> {
    const key =
      options.keyGenerator?.(
        request,
      ) ??
      request.headers[
        'x-forwarded-for'
      ] ??
      'anonymous';

    const result =
      await this.store.increment(
        key,
        options.windowMs,
      );

    return {
      allowed:
        result.count <=
        options.maxRequests,

      remaining: Math.max(
        0,
        options.maxRequests -
          result.count,
      ),

      resetAt: result.resetAt,
    };
  }
}