import type {
  Middleware,
  NextFunction,
} from '../middleware/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  RequestLogger,
} from './requestLogger.js';

export class LoggerMiddleware
  implements Middleware {

  constructor(
    private readonly logger: RequestLogger,
  ) {}

  async handle(
  request: GatewayRequest,
  response: GatewayResponse,
  next: NextFunction,
): Promise<void> {

  void response;

  const started =
    Date.now();

  await this.logger.logRequest(
    request,
  );

  await next();

  const duration =
    Date.now() - started;

  await this.logger.logResponse(
    request,
    duration,
  );
}
}