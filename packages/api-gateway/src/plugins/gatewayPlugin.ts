import type { RouteDefinition } from '../router/index.js';
import type { Middleware } from '../middleware/index.js';

export interface GatewayPlugin {
  readonly name: string;

  registerRoutes(): readonly RouteDefinition[];

  registerMiddleware?(): readonly Middleware[];
}