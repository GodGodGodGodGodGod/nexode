export type UserId = string;

export type Role = string;

export type Permission = string;

export interface UserIdentity {
  id: UserId;
  email: string;
  username?: string;
  displayName?: string;
  roles: Role[];
  permissions: Permission[];
  metadata?: Record<string, unknown>;
}

export interface AccessToken {
  token: string;
  expiresAt: Date;
}

export interface RefreshToken {
  token: string;
  expiresAt: Date;
}

export interface Session {
  id: string;
  user: UserIdentity;
  accessToken: AccessToken;
  refreshToken?: RefreshToken;
  createdAt: Date;
  expiresAt: Date;
}