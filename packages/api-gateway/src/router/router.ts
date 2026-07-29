import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  RouteDefinition,
} from './routeDefinition.js';

import type {
  RouteRegistry,
} from './routeRegistry.js';

export interface RouteMatch {
  readonly route: RouteDefinition;

  readonly params: Record<string, string>;
}

export class Router {
  constructor(
    private readonly routes: RouteRegistry,
  ) {}

  resolve(
    request: GatewayRequest,
  ): RouteMatch | undefined {
    for (const route of this.routes.getRoutes()) {
      const params = this.matchRoute(
        route.path,
        request.path,
      );

      if (!params) {
        continue;
      }

      if (route.method !== request.method) {
        continue;
      }

      return {
      route,
      params,
};
    }

    return undefined;
  }

  private matchRoute(
    routePath: string,
    requestPath: string,
  ): Record<string, string> | null {
    const routeParts =
      routePath.split('/');

    const requestParts =
      requestPath.split('/');

    if (
      routeParts.length !==
      requestParts.length
    ) {
      return null;
    }

    const params: Record<
      string,
      string
    > = {};

    for (
      let i = 0;
      i < routeParts.length;
      i++
    ) {
  
 const routePart = routeParts[i]!;

const requestPart = requestParts[i]!;

      if (
        routePart.startsWith(':')
      ) {
        params[
          routePart.slice(1)
        ] = requestPart;

        continue;
      }

      if (
        routePart !== requestPart
      ) {
        return null;
      }
    }

    return params;
  }
}