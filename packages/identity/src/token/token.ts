export interface Token {
  readonly id: string;

  readonly userId: string;

  readonly sessionId: string;

  readonly issuedAt: Date;

  readonly expiresAt: Date;
}