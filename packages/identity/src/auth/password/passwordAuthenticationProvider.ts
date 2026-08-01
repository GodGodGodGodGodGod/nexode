import type {
  AuthenticationProvider,
} from '../authenticationProvider.js';

import type {
  AuthenticationRequest,
} from '../authenticationRequest.js';

import type {
  AuthenticationResult,
} from '../authenticationResult.js';

import type {
  PasswordHasher,
} from '../../security/index.js';

import type {
  UserRepository,
} from '../../identity/index.js';

export class PasswordAuthenticationProvider
  implements AuthenticationProvider {

  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async authenticate(
    request: AuthenticationRequest,
  ): Promise<AuthenticationResult> {

    const user =
  await this.users.findByEmail(
    request.email,
  );

    if (!user) {
      return {
        authenticated: false,
        reason: 'Invalid credentials',
      };
    }

    const valid =
      await this.hasher.verify(
        request.credential,
        user.passwordHash,
      );

    if (!valid) {
      return {
        authenticated: false,
        reason: 'Invalid credentials',
      };
    }

    return {
      authenticated: true,
      userId: user.id,
    };
  }
}