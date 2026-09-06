export interface EmailVerificationToken {
  readonly id: string;

  readonly userId: string;

  readonly token: string;

  readonly createdAt: Date;

  readonly expiresAt: Date;

  readonly usedAt?: Date;
}