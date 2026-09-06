export interface IdentityUser {
  readonly id: string;

  readonly email: string;

  readonly username?: string;

  readonly displayName?: string;

  readonly roles: readonly string[];

  readonly permissions: readonly string[];

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly enabled: boolean;

  readonly emailVerified: boolean;

  readonly passwordHash: string;
}