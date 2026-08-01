export interface RefreshToken {
  readonly id: string;

  readonly userId: string;

  readonly sessionId: string;

  readonly issuedAt: Date;

  readonly expiresAt: Date;

  readonly revoked: boolean;
}