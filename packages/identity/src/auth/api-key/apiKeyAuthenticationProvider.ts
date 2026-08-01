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
  ApiKeyRepository,
} from './apiKeyRepository.js';

export class ApiKeyAuthenticationProvider
  implements AuthenticationProvider {

  constructor(
    private readonly repository: ApiKeyRepository,
  ) {}

  async authenticate(
    request: AuthenticationRequest,
  ): Promise<AuthenticationResult> {

    const apiKey =
      await this.repository.findByKey(
        request.credential,
      );

    if (!apiKey) {
      return {
        authenticated: false,
        reason: 'Invalid API key',
      };
    }

    if (apiKey.revoked) {
      return {
        authenticated: false,
        reason: 'API key revoked',
      };
    }

    if (
      apiKey.expiresAt &&
      apiKey.expiresAt < new Date()
    ) {
      return {
        authenticated: false,
        reason: 'API key expired',
      };
    }

    return {
      authenticated: true,
      userId: apiKey.ownerId,
    };
  }
}