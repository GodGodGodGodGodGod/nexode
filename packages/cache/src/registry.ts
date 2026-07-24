import type { Cache } from './cache.js';

let currentCache: Cache | null = null;

export function getCache(): Cache {
  if (!currentCache) {
    throw new Error(
      'Cache has not been registered.',
    );
  }

  return currentCache;
}

export function setCache(
  cache: Cache,
): void {
  currentCache = cache;
}