import type {
  Authorizer,
} from '../authorizer.js';

import type {
  AuthorizationStrategy,
} from '../authorizationStrategy.js';

export interface AuthorizationRegistry {

  register(
    name: AuthorizationStrategy,
    authorizer: Authorizer,
  ): void;

  find(
    name: AuthorizationStrategy,
  ): Authorizer | undefined;

  list(): readonly AuthorizationStrategy[];
}