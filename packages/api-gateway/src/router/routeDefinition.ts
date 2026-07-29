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
  RouteSchema,
} from '../validation/index.js';

import type {
  AuthStrategy,
} from '../auth/index.js';

import type {
  RateLimitOptions,
} from '../rate-limit/index.js';

export interface RouteDefinition {
  readonly method: string;

  readonly path: string;

  readonly handler: RouteHandler;

  readonly metadata?: RouteMetadata;

  readonly middleware?: readonly Middleware[];

  readonly schema?: RouteSchema;
  
  readonly auth?: AuthStrategy;

  readonly roles?: readonly string[];

  readonly permissions?: readonly string[];

  readonly rateLimit?: RateLimitOptions;
}