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
  OAuthProvider,
} from './oauthProvider.js';

export class OAuthAuthenticationProvider
  implements AuthenticationProvider {

  constructor(
    private readonly provider: OAuthProvider,
  ) {}

  async authenticate(
    request: AuthenticationRequest,
  ): Promise<AuthenticationResult> {

    const profile =
      await this.provider.authenticate(
        request.credential,
      );

    return {
      authenticated: true,
      userId: profile.providerUserId,
    };
  }
}