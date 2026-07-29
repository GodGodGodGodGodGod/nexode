import {
  ApplicationContext,
  DefaultContainer,
  LifecycleManager,
  PluginManager,
  setContainer,
} from '@nexode/core';

import { AuthPlugin } from '@nexode/auth';
import { CachePlugin } from '@nexode/cache';
import { ConfigPlugin } from '@nexode/config';
import { DatabasePlugin } from '@nexode/database';
import { EventsPlugin } from '@nexode/events';
import { LoggerPlugin } from '@nexode/logger';
import { NotificationsPlugin } from '@nexode/notifications';
import { SecurityPlugin } from '@nexode/security';
import { StoragePlugin } from '@nexode/storage';

export async function bootstrap(): Promise<ApplicationContext> {
  const container = new DefaultContainer();
  const lifecycle = new LifecycleManager();
  const plugins = new PluginManager();

  const context = new ApplicationContext(
    container,
    lifecycle,
    plugins,
  );

  setContainer(container);

  plugins.register(ConfigPlugin);
  plugins.register(LoggerPlugin);
  plugins.register(EventsPlugin);
  plugins.register(CachePlugin);
  plugins.register(DatabasePlugin);
  plugins.register(SecurityPlugin);
  plugins.register(StoragePlugin);
  plugins.register(NotificationsPlugin);
  plugins.register(AuthPlugin);

  plugins.load(container);

  await lifecycle.start();

  return context;
}