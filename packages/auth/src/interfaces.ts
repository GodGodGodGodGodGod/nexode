import type {
  Session,
  UserIdentity,
} from './types.js';

import type {
  TokenPair,
  VerifyTokenResult,
} from './token.types.js';

export interface AuthService {
  authenticate(
    credentials: unknown
  ): Promise<Session>;

  verifyAccessToken(
    token: string
  ): Promise<UserIdentity>;

  revokeSession(
    sessionId: string
  ): Promise<void>;
}

export interface SessionService {
  create(
    user: UserIdentity
  ): Promise<Session>;

  get(
    sessionId: string
  ): Promise<Session | null>;

  destroy(
    sessionId: string
  ): Promise<void>;
}

export interface TokenService {
  issue(
    user: UserIdentity
  ): Promise<TokenPair>;

  verify(
    token: string
  ): Promise<VerifyTokenResult>;

  refresh(
    refreshToken: string
  ): Promise<TokenPair>;
}