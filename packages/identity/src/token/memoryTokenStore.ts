import type {
  Token,
} from './token.js';

import type {
  RefreshToken,
} from './refreshToken.js';

import type {
  TokenStore,
} from './tokenStore.js';

export class MemoryTokenStore
  implements TokenStore {

  private readonly accessTokens =
    new Map<string, Token>();

  private readonly refreshTokens =
    new Map<string, RefreshToken>();

  async saveAccessToken(
    token: Token,
  ): Promise<void> {

    this.accessTokens.set(
      token.id,
      token,
    );
  }

  async saveRefreshToken(
    token: RefreshToken,
  ): Promise<void> {

    this.refreshTokens.set(
      token.id,
      token,
    );
  }

  async findRefreshToken(
    id: string,
  ): Promise<
    RefreshToken | undefined
  > {

    return this.refreshTokens.get(id);
  }

  async revokeRefreshToken(
    id: string,
  ): Promise<void> {

    this.refreshTokens.delete(id);
  }
}