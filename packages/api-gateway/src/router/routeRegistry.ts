import type {
  RouteDefinition,
} from './routeDefinition.js';

export class RouteRegistry {
  private readonly routes: RouteDefinition[] = [];

  register(route: RouteDefinition): void {
    this.routes.push(route);
  }

  registerMany(routes: readonly RouteDefinition[]): void {
    this.routes.push(...routes);
  }

  getRoutes(): readonly RouteDefinition[] {
    return this.routes;
  }

  clear(): void {
    this.routes.length = 0;
  }
}