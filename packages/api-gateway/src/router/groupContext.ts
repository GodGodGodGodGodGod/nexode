import type { Middleware } from '../middleware/index.js';
import type { MiddlewarePipeline } from '../middleware/index.js';
import type { RouteHandler } from '../types/index.js';

import { RouteGroup } from './routeGroup.js';
import type { RouteRegistry } from './routeRegistry.js';

export class GroupContext extends RouteGroup {
  constructor(
    prefix: string,
    routes: RouteRegistry,
    private readonly pipeline: MiddlewarePipeline,
  ) {
    super(prefix, routes);
  }

  use(
    middleware: Middleware,
  ): void {
    this.pipeline.use(middleware);
  }

  override get(
    path: string,
    handler: RouteHandler,
  ): void {
    super.get(path, handler);
  }

  override post(
    path: string,
    handler: RouteHandler,
  ): void {
    super.post(path, handler);
  }

  override put(
    path: string,
    handler: RouteHandler,
  ): void {
    super.put(path, handler);
  }

  override patch(
    path: string,
    handler: RouteHandler,
  ): void {
    super.patch(path, handler);
  }

  override delete(
    path: string,
    handler: RouteHandler,
  ): void {
    super.delete(path, handler);
  }
}