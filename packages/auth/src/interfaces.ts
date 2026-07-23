import type {
  Session,
  UserIdentity,
  AccessToken,
} from './types.js';

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
  ): Promise<AccessToken>;

  verify(
    token: string
  ): Promise<UserIdentity>;
}