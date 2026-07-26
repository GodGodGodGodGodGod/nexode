import {
  CACHE_SERVICE,
  type CorePlugin,
} from '@nexode/core';

import {
  MemoryCache,
} from '../providers/memory/memoryCache.js';


export const CachePlugin: CorePlugin = {
  name: 'cache',

  register(container) {
    container.register({
      token: CACHE_SERVICE,
      implementation: new MemoryCache(),
      lifetime: 'singleton',
    });
  },
};