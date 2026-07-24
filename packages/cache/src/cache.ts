import type {
  CacheKey,
  CacheOptions,
  CacheStatistics,
} from './types.js';

export interface Cache {
  get<T>(key: CacheKey): Promise<T | null>;

  set<T>(
    key: CacheKey,
    value: T,
    options?: CacheOptions,
  ): Promise<void>;

  delete(
    key: CacheKey,
  ): Promise<void>;

  clear(): Promise<void>;

  has(
    key: CacheKey,
  ): Promise<boolean>;

  stats(): Promise<CacheStatistics>;
}