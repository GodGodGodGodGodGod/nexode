import type {
  AuthenticationProvider,
} from './authenticationProvider.js';

import type {
  AuthenticationRequest,
} from './authenticationRequest.js';

import type {
  AuthenticationResult,
} from './authenticationResult.js';

export class AuthenticationManager {
  constructor(
    private readonly provider: AuthenticationProvider,
  ) {}

  authenticate(
    request: AuthenticationRequest,
  ): Promise<AuthenticationResult> {
    return this.provider.authenticate(
      request,
    );
  }
}