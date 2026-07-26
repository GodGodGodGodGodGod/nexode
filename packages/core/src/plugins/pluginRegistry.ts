import type {
  CorePlugin,
} from './plugin.js';

export class PluginRegistry {
  private readonly plugins =
    new Map<string, CorePlugin>();

  register(
    plugin: CorePlugin,
  ): void {
    this.plugins.set(
      plugin.name,
      plugin,
    );
  }

  getAll(): CorePlugin[] {
    return [
      ...this.plugins.values(),
    ];
  }
}