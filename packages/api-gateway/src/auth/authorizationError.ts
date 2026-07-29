import {
  GatewayError,
} from '../errors/index.js';

export class AuthorizationError
  extends GatewayError {

  constructor(
    message = 'Forbidden',
  ) {
    super(403, message);
  }
}