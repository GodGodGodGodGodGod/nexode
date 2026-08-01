import type {
  Token,
} from './token.js';

import type {
  RefreshToken,
} from './refreshToken.js';

import type {
  TokenStore,
} from './tokenStore.js';

export class TokenManager {

  constructor(
    private readonly store: TokenStore,
  ) {}

  async issue(
    accessToken: Token,
    refreshToken: RefreshToken,
  ): Promise<void> {

    await this.store.saveAccessToken(
      accessToken,
    );

    await this.store.saveRefreshToken(
      refreshToken,
    );
  }

  async revokeRefreshToken(
    id: string,
  ): Promise<void> {

    await this.store.revokeRefreshToken(
      id,
    );
  }
}