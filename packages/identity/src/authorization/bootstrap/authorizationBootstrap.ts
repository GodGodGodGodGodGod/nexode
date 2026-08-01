import {
  AuthorizationStrategy,
} from '../authorizationStrategy.js';

import type {
  AuthorizationRegistry,
} from '../registry/authorizationRegistry.js';

import {
  RbacAuthorizer,
} from '../rbac/index.js';

export class AuthorizationBootstrap {

  constructor(
    private readonly registry: AuthorizationRegistry,
  ) {}

  registerDefaults(): void {

    this.registry.register(
      AuthorizationStrategy.RBAC,
      new RbacAuthorizer(),
    );
  }
}