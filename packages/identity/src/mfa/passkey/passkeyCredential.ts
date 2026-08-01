export interface PasskeyCredential {
  readonly id: string;

  readonly userId: string;

  readonly credentialId: string;

  readonly publicKey: string;

  readonly signCount: number;

  readonly createdAt: Date;
}