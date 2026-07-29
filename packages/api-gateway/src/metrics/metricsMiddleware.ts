import type {
  Middleware,
  NextFunction,
} from '../middleware/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  MetricsCollector,
} from './metricsCollector.js';

export class MetricsMiddleware
  implements Middleware {

  constructor(
    private readonly metrics: MetricsCollector,
  ) {}

  async handle(
    request: GatewayRequest,
    response: GatewayResponse,
    next: NextFunction,
  ): Promise<void> {

    void request;
    void response;

    const started =
      Date.now();

    this.metrics.increment(
      'http.requests.total',
    );

    this.metrics.increment(
      'http.requests.active',
    );

    try {

      await next();

    } finally {

      this.metrics.increment(
        'http.requests.active',
        -1,
      );

      this.metrics.timing(
        'http.request.duration',
        Date.now() - started,
      );
    }
  }
}