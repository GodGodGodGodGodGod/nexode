import type {
  RateLimitStore,
} from './rateLimitStore.js';

export class MemoryRateLimitStore
  implements RateLimitStore {

  private readonly storage =
    new Map<
      string,
      {
        count: number;
        resetAt: number;
      }
    >();

  async increment(
    key: string,
    windowMs: number,
  ) {
    const now = Date.now();

    const existing =
      this.storage.get(key);

    if (
      !existing ||
      existing.resetAt <= now
    ) {
      const resetAt =
        now + windowMs;

      this.storage.set(
        key,
        {
          count: 1,
          resetAt,
        },
      );

      return {
        count: 1,
        resetAt: new Date(resetAt),
      };
    }

    existing.count++;

    return {
      count: existing.count,
      resetAt: new Date(
        existing.resetAt,
      ),
    };
  }
}