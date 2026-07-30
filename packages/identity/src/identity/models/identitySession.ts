export interface IdentitySession {
  readonly id: string;

  readonly userId: string;

  readonly createdAt: Date;

  readonly expiresAt: Date;

  readonly lastActivityAt: Date;

  readonly ipAddress?: string;

  readonly userAgent?: string;
}