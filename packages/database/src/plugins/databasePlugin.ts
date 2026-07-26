import type {
  CorePlugin,
} from '@nexode/core';

import {
  DATABASE_SERVICE,
} from '@nexode/core';

import {
  MemoryDatabaseClient,
} from '../providers/memory/memoryClient.js';


export const DatabasePlugin: CorePlugin = {
  name: 'database',

  register(container) {
    container.register({
      token: DATABASE_SERVICE,
      implementation: new MemoryDatabaseClient(),
      lifetime: 'singleton',
    });
  },
};