import type {
  RouteDefinition,
} from '@nexode/api-gateway';

import {
  createIdentityRoutes,
} from './identity.routes.js';

export class IdentityModule {
  registerRoutes(): readonly RouteDefinition[] {
    return createIdentityRoutes();
  }
}