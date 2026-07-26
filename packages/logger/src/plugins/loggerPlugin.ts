import type {
  CorePlugin,
} from '@nexode/core';

import {
  LOGGER_SERVICE,
} from '@nexode/core';

import {
  logger,
} from '../logger.js';

export const LoggerPlugin: CorePlugin = {
  name: 'logger',

  register(container) {
    container.register({
      token: LOGGER_SERVICE,
      implementation: logger,
      lifetime: 'singleton',
    });
  },
};