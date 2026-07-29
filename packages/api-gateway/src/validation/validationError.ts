import { GatewayError } from '../errors/index.js';

export class ValidationError extends GatewayError {
  constructor(
    message: string,
  ) {
    super(
      400,
      message,
    );
  }
}