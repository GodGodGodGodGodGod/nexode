import type {
  AuthorizationRequest,
} from './authorizationRequest.js';

import type {
  AuthorizationResult,
} from './authorizationResult.js';

export interface Authorizer {

  authorize(
    request: AuthorizationRequest,
  ): Promise<AuthorizationResult>;
}