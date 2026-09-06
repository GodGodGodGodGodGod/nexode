import type {
  ApiGateway,
  RouteDefinition,
} from '@nexode/api-gateway';

import {
  IdentityModule,
} from '../modules/identity/identity.module.js';

const API_PREFIX = '/api/v1';

export function registerRoutes(
  gateway: ApiGateway,
): void {
  const identity =
    new IdentityModule();

  const routes = identity
    .registerRoutes()
    .map((route): RouteDefinition => ({
      ...route,
      path: `${API_PREFIX}${route.path}`,
    }));

  gateway.routes.registerMany(
    routes,
  );
}