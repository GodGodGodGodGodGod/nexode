import {
  GatewayError,
} from '../errors/index.js';

export class AuthenticationError
  extends GatewayError {

  constructor(
    message = 'Unauthorized',
  ) {
    super(401, message);
  }
}