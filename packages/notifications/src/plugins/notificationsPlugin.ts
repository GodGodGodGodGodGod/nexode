import type {
  CorePlugin,
} from '@nexode/core';

import {
  NOTIFICATIONS_SERVICE,
} from '@nexode/core';

export const NotificationsPlugin: CorePlugin = {
  name: 'notifications',

  register(container) {
    container.register({
      token: NOTIFICATIONS_SERVICE,
      implementation: {},
      lifetime: 'singleton',
    });
  },
};