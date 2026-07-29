import {
  GatewayError,
} from '../errors/index.js';

export class RateLimitError
  extends GatewayError {

  constructor(
    message =
      'Too Many Requests',
  ) {
    super(
      429,
      message,
    );
  }
}