export interface MfaSecret {
  readonly userId: string;

  readonly secret: string;

  readonly enabled: boolean;

  readonly recoveryCodes:
    readonly string[];

  readonly createdAt: Date;

  readonly updatedAt: Date;
}