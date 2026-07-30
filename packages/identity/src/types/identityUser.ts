export interface IdentityUser {
  readonly id: string;

  readonly email: string;

  readonly roles: readonly string[];

  readonly permissions: readonly string[];
}