export interface CacheEntry<T = unknown> {
  value: T;
  expiresAt?: Date;
}

export interface CacheOptions {
  ttl?: number;
}

export interface CacheStatistics {
  keys: number;
}

export type CacheKey = string;