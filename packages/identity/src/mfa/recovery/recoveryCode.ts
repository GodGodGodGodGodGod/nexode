export interface RecoveryCode {
  readonly id: string;

  readonly userId: string;

  readonly code: string;

  readonly used: boolean;

  readonly createdAt: Date;
}