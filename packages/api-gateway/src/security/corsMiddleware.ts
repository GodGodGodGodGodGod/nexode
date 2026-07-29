import type {
  Middleware,
  NextFunction,
} from '../middleware/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  CorsOptions,
} from './corsOptions.js';

export class CorsMiddleware
  implements Middleware {

  constructor(
    private readonly options: CorsOptions,
  ) {}

  async handle(
    request: GatewayRequest,
    response: GatewayResponse,
    next: NextFunction,
  ): Promise<void> {

    void request;

    let origin = '*';

    if (typeof this.options.origin === 'string') {
      origin = this.options.origin;
    } else if (this.options.origin !== undefined) {
      origin = [...this.options.origin].join(',');
    }

    response.header(
      'Access-Control-Allow-Origin',
      origin,
    );

    response.header(
      'Access-Control-Allow-Methods',
      [...(this.options.methods ?? [])].join(','),
    );

    response.header(
      'Access-Control-Allow-Headers',
      [...(this.options.headers ?? [])].join(','),
    );

    if (this.options.credentials) {
      response.header(
        'Access-Control-Allow-Credentials',
        'true',
      );
    }

    await next();
  }
}