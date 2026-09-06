export interface MfaLoginChallenge {
  readonly id: string;

  readonly userId: string;

  readonly email: string;

  readonly ipAddress?: string;

  readonly userAgent?: string;

  readonly createdAt: Date;

  readonly expiresAt: Date;
}
