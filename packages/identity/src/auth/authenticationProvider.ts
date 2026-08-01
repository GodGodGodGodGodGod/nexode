import type {
  AuthenticationRequest,
} from './authenticationRequest.js';

import type {
  AuthenticationResult,
} from './authenticationResult.js';

export interface AuthenticationProvider {
  authenticate(
    request: AuthenticationRequest,
  ): Promise<AuthenticationResult>;
}