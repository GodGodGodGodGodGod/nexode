import type {
  CorePlugin,
} from './plugin.js';

import type {
  ServiceContainer,
} from '../interfaces.js';

export class PluginManager {
  private readonly plugins: CorePlugin[] = [];

  register(
    plugin: CorePlugin,
  ): void {
    this.plugins.push(plugin);
  }

  load(
    container: ServiceContainer,
  ): void {
    for (const plugin of this.plugins) {
      plugin.register(container);
    }
  }

  getPlugins(): readonly CorePlugin[] {
    return this.plugins;
  }
}