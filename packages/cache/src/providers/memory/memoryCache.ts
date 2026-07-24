import type { Cache } from '../../cache.js';
import type {
  CacheEntry,
  CacheKey,
  CacheOptions,
  CacheStatistics,
} from '../../types.js';

export class MemoryCache implements Cache {
  private readonly store = new Map<
    CacheKey,
    CacheEntry
  >();

  async get<T>(
    key: CacheKey,
  ): Promise<T | null> {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (
      entry.expiresAt &&
      entry.expiresAt <= new Date()
    ) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(
    key: CacheKey,
    value: T,
    options?: CacheOptions,
  ): Promise<void> {
    const expiresAt =
      options?.ttl !== undefined
        ? new Date(Date.now() + options.ttl * 1000)
        : undefined;

    this.store.set(key, {
      value,
      expiresAt,
    });
  }

  async delete(
    key: CacheKey,
  ): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async has(
    key: CacheKey,
  ): Promise<boolean> {
    return (await this.get(key)) !== null;
  }

  async stats(): Promise<CacheStatistics> {
    return {
      keys: this.store.size,
    };
  }
}