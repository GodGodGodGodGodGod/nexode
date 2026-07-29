import type { GatewayPlugin } from './gatewayPlugin.js';

import type {
  RouteRegistry,
} from '../router/index.js';

import type {
  MiddlewarePipeline,
} from '../middleware/index.js';

export class GatewayPluginManager {
  private readonly plugins: GatewayPlugin[] = [];

  register(plugin: GatewayPlugin): void {
    this.plugins.push(plugin);
  }

  load(
    registry: RouteRegistry,
    middleware: MiddlewarePipeline,
  ): void {
    for (const plugin of this.plugins) {
      registry.registerMany(
        plugin.registerRoutes(),
      );

      const middlewareList =
        plugin.registerMiddleware?.() ?? [];

      for (const item of middlewareList) {
        middleware.use(item);
      }
    }
  }

  getPlugins(): readonly GatewayPlugin[] {
    return this.plugins;
  }
}