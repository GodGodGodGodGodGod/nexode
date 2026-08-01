export interface TotpSecret {
  readonly userId: string;

  readonly secret: string;

  readonly enabled: boolean;

  readonly createdAt: Date;
}