import type {
  UserIdentity,
} from '../types.js';

import type {
  TokenService,
} from '../interfaces.js';

import type {
  TokenPair,
  VerifyTokenResult,
} from '../token.types.js';

export class MemoryTokenService implements TokenService {
  async issue(
    user: UserIdentity
  ): Promise<TokenPair> {
    return {
      accessToken: `access-${user.id}`,
      refreshToken: `refresh-${user.id}`,
    };
  }

  async verify(
    token: string
  ): Promise<VerifyTokenResult> {
    return {
      subject: token.replace('access-', ''),
      claims: {
        sub: token.replace('access-', ''),
        iss: 'memory',
        aud: 'nexode',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
    };
  }

  async refresh(): Promise<TokenPair> {
    throw new Error(
      'Refresh tokens are not implemented in the memory provider.'
    );
  }
}