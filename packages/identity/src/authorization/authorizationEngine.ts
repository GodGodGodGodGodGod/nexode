import type {
  AuthorizationRequest,
} from './authorizationRequest.js';

import type {
  AuthorizationResult,
} from './authorizationResult.js';

import type {
  Authorizer,
} from './authorizer.js';

import {
  AuthorizationStrategy,
} from './authorizationStrategy.js';

import type {
  AuthorizationRegistry,
} from './registry/authorizationRegistry.js';

export class AuthorizationEngine
  implements Authorizer {

  constructor(
    private readonly registry: AuthorizationRegistry,
  ) {}

  async authorize(
    request: AuthorizationRequest,
  ): Promise<AuthorizationResult> {

    const authorizer =
      this.registry.find(
        AuthorizationStrategy.RBAC,
      );

    if (!authorizer) {

      return {
        allowed: false,
        reason:
          'No authorization strategy registered.',
      };

    }

    return authorizer.authorize(
      request,
    );
  }
}