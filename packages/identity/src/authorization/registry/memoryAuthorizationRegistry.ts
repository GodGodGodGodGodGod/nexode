import type {
  Authorizer,
} from '../authorizer.js';

import type {
  AuthorizationRegistry,
} from './authorizationRegistry.js';

import type {
  AuthorizationStrategy,
} from '../authorizationStrategy.js';

export class MemoryAuthorizationRegistry
  implements AuthorizationRegistry {

  private readonly authorizers =
    new Map<
      AuthorizationStrategy,
      Authorizer
    >();

  register(
    name: AuthorizationStrategy,
    authorizer: Authorizer,
  ): void {

    this.authorizers.set(
      name,
      authorizer,
    );
  }

  find(
    name: AuthorizationStrategy,
  ): Authorizer | undefined {

    return this.authorizers.get(
      name,
    );
  }

  list(): readonly AuthorizationStrategy[] {

    return [
      ...this.authorizers.keys(),
    ];
  }
}