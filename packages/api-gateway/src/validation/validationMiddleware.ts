import type {
  Middleware,
  NextFunction,
} from '../middleware/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  RouteSchema,
} from './types.js';

import {
  validateRequest,
} from './validator.js';

export class ValidationMiddleware
  implements Middleware {

  constructor(
    private readonly schema?: RouteSchema,
  ) {}

  async handle(
    request: GatewayRequest,
    response: GatewayResponse,
    next: NextFunction,
  ): Promise<void> {
    validateRequest(
      request,
      this.schema,
    );

    await next();
  }
}