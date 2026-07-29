import type {
  CorePlugin,
} from '@nexode/core';

import {
  EVENTS_SERVICE,
} from '@nexode/core';

export const EventsPlugin: CorePlugin = {
  name: 'events',

  register(container) {
    container.register({
      token: EVENTS_SERVICE,
      implementation: {},
      lifetime: 'singleton',
    });
  },
};