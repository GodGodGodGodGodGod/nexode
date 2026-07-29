import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  Logger,
} from './logger.js';

import {
  LogLevel,
} from './logLevel.js';

export class RequestLogger {

  constructor(
    private readonly logger: Logger,
  ) {}

  async logRequest(
    request: GatewayRequest,
  ): Promise<void> {

    await this.logger.log(
      LogLevel.INFO,
      'Incoming request',
     {
  requestId:
    request.requestId,

  correlationId:
    request.correlationId,

  method:
    request.method,

  path:
    request.path,

  params:
    request.params,

  query:
    request.query,
},
    );
  }
  async logResponse(
  request: GatewayRequest,
  duration: number,
): Promise<void> {

  await this.logger.log(
    LogLevel.INFO,
    'Request completed',
    {
      requestId:
        request.requestId,

      correlationId:
        request.correlationId,

      method:
        request.method,

      path:
        request.path,

      duration,
    },
  );
}
}