import type {
  Middleware,
  NextFunction,
} from '../middleware/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import {
  applySecurityHeaders,
} from './securityHeaders.js';

export class SecurityMiddleware
  implements Middleware {

  async handle(
    request: GatewayRequest,
    response: GatewayResponse,
    next: NextFunction,
  ): Promise<void> {
    // Reserved for future security checks
    void request;

    applySecurityHeaders(
      response,
    );

    await next();
  }
}