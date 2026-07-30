export interface IdentityCredential {
  readonly userId: string;

  readonly passwordHash: string;

  readonly passwordUpdatedAt: Date;
}