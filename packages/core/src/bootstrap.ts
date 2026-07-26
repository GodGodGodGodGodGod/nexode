import {
  DefaultContainer,
} from './providers/default/index.js';

import {
  setContainer,
} from './container.js';

import {
  AUTH_SERVICE,
  CACHE_SERVICE,
  CONFIG_SERVICE,
  DATABASE_SERVICE,
  EVENTS_SERVICE,
  LOGGER_SERVICE,
  NOTIFICATIONS_SERVICE,
  SECURITY_SERVICE,
  STORAGE_SERVICE,
} from './services/index.js';

export async function bootstrap(): Promise<void> {
  const container = new DefaultContainer();

  container.register({
    token: CONFIG_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: LOGGER_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: EVENTS_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: CACHE_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: DATABASE_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: SECURITY_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: STORAGE_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: NOTIFICATIONS_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  container.register({
    token: AUTH_SERVICE,
    implementation: {},
    lifetime: 'singleton',
  });

  setContainer(container);
}