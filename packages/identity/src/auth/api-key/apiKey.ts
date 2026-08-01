export interface ApiKey {
  readonly id: string;

  readonly key: string;

  readonly ownerId: string;

  readonly name: string;

  readonly createdAt: Date;

  readonly expiresAt?: Date;

  readonly revoked: boolean;
}