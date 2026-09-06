export interface CreateSessionInput {
  readonly id: string;

  readonly userId: string;

  readonly createdAt: Date;

  readonly ipAddress?: string;

  readonly userAgent?: string;
}