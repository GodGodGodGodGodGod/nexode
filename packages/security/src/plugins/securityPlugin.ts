import type {
  CorePlugin,
} from '@nexode/core';

import {
  SECURITY_SERVICE,
} from '@nexode/core';

export const SecurityPlugin: CorePlugin = {
  name: 'security',

  register(container) {
    container.register({
      token: SECURITY_SERVICE,
      implementation: {},
      lifetime: 'singleton',
    });
  },
};