import type {
  Middleware,
} from '../middleware/index.js';

import type {
  RouteHandler,
} from '../types/index.js';

import type {
  RouteMetadata,
} from './routeMetadata.js';

import type {
  RouteRegistry,
} from './routeRegistry.js';

import type {

  RouteSchema,

} from '../validation/index.js';
import type {
  AuthStrategy,
} from '../auth/index.js';

import type {
  RateLimitOptions,
} from '../rate-limit/index.js';

export interface RouteOptions {

  readonly metadata?: RouteMetadata;

  readonly middleware?: readonly Middleware[];

  readonly schema?: RouteSchema;

  readonly auth?: AuthStrategy;

  readonly roles?: readonly string[];

  readonly permissions?: readonly string[];
 
  readonly rateLimit?: RateLimitOptions;
}

export class RouteGroup {
  constructor(
    protected readonly prefix: string,
    protected readonly routes: RouteRegistry,
  ) {}

  get(
    path: string,
    handler: RouteHandler,
    options: RouteOptions = {},
  ): void {
    this.routes.register({
      method: 'GET',
      path: this.prefix + path,
      handler,
      metadata: options.metadata,
      middleware: options.middleware,
      schema: options.schema,
      auth: options.auth,
      roles: options.roles,
      rateLimit: options.rateLimit,
      permissions: options.permissions,
    });
  }

  post(
    path: string,
    handler: RouteHandler,
    options: RouteOptions = {},
  ): void {
    this.routes.register({
      method: 'POST',
      path: this.prefix + path,
      handler,
      metadata: options.metadata,
      middleware: options.middleware,
      schema: options.schema,
      auth: options.auth,
      rateLimit: options.rateLimit,
      roles: options.roles,
      permissions: options.permissions,
    });
  }

  put(
    path: string,
    handler: RouteHandler,
    options: RouteOptions = {},
  ): void {
    this.routes.register({
      method: 'PUT',
      path: this.prefix + path,
      handler,
      metadata: options.metadata,
      middleware: options.middleware,
      schema: options.schema,
      rateLimit: options.rateLimit,
      auth: options.auth,
      roles: options.roles,
      permissions: options.permissions,
    });
  }

  patch(
    path: string,
    handler: RouteHandler,
    options: RouteOptions = {},
  ): void {
    this.routes.register({
      method: 'PATCH',
      path: this.prefix + path,
      handler,
      metadata: options.metadata,
      middleware: options.middleware,
      schema: options.schema,
      auth: options.auth,
      roles: options.roles,
      rateLimit: options.rateLimit,
      permissions: options.permissions,
    });
  }

  delete(
    path: string,
    handler: RouteHandler,
    options: RouteOptions = {},
  ): void {
    this.routes.register({
      method: 'DELETE',
      path: this.prefix + path,
      handler,
      metadata: options.metadata,
      middleware: options.middleware,
      schema: options.schema,
      auth: options.auth,
      roles: options.roles,
      rateLimit: options.rateLimit,
      permissions: options.permissions,
    });
  }
}