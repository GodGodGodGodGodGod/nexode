import type {
  CorePlugin,
} from '@nexode/core';

import {
  AUTH_SERVICE,
} from '@nexode/core';

export const AuthPlugin: CorePlugin = {
  name: 'auth',

  register(container) {
    container.register({
      token: AUTH_SERVICE,
      implementation: {},
      lifetime: 'singleton',
    });
  },
};