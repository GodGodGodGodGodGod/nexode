import type {
  Token,
} from './token.js';

import type {
  RefreshToken,
} from './refreshToken.js';

export interface TokenStore {
  saveAccessToken(
    token: Token,
  ): Promise<void>;

  saveRefreshToken(
    token: RefreshToken,
  ): Promise<void>;

  findRefreshToken(
    id: string,
  ): Promise<RefreshToken | undefined>;

  revokeRefreshToken(
    id: string,
  ): Promise<void>;
}