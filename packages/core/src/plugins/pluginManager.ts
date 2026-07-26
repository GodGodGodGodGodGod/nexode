import type {
  ServiceContainer,
} from '../interfaces.js';

import {
  PluginRegistry,
} from './pluginRegistry.js';

export class PluginManager {
  private readonly registry =
    new PluginRegistry();

  register(
    plugin: Parameters<
      PluginRegistry['register']
    >[0],
  ): void {
    this.registry.register(
      plugin,
    );
  }

  async load(
    container: ServiceContainer,
  ): Promise<void> {
    for (
      const plugin of
      this.registry.getAll()
    ) {
      await plugin.register(
        container,
      );
    }
  }
}