import type { Cache } from './cache.js';

export interface CacheProvider {
  createCache(): Cache;
}