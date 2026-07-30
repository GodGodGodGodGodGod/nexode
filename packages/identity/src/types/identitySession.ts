export interface IdentitySession {
  readonly id: string;

  readonly userId: string;

  readonly createdAt: Date;

  readonly expiresAt: Date;
}