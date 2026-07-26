import type {
  CorePlugin,
} from '@nexode/core';

import {
  STORAGE_SERVICE,
} from '@nexode/core';

import {
  LocalStorage,
} from '../providers/local/localStorage.js';


export const StoragePlugin: CorePlugin = {
  name: 'storage',

  register(container) {
    container.register({
      token: STORAGE_SERVICE,
      implementation: new LocalStorage(
        './storage',
      ),
      lifetime: 'singleton',
    });
  },
};