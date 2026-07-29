import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  AuthenticationResult,
} from './types.js';

import type {
  AuthStrategy,
} from './authStrategy.js';

export class AuthProvider {
  constructor(
    private readonly strategy: AuthStrategy,
  ) {}

  authenticate(
    request: GatewayRequest,
  ): Promise<AuthenticationResult> {
    return this.strategy.authenticate(
      request,
    );
  }
}