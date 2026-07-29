export interface AuthUser {
  readonly id: string;

  readonly roles: readonly string[];

  readonly permissions: readonly string[];

  readonly metadata?: Record<string, unknown>;
}

export interface AuthenticationResult {
  readonly authenticated: boolean;

  readonly user?: AuthUser;
}