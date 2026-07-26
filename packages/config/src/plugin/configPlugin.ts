import type {
  CorePlugin,
} from '@nexode/core';

import {
  CONFIG_SERVICE,
} from '@nexode/core';

import {
  getConfig,
} from '../config.js';

export const ConfigPlugin: CorePlugin = {
  name: 'config',

  register(container) {
    container.register({
      token: CONFIG_SERVICE,
      implementation: getConfig(),
      lifetime: 'singleton',
    });
  },
};