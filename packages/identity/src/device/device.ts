export interface Device {
  readonly id: string;

  readonly userId: string;

  readonly name: string;

  readonly fingerprint: string;

  readonly trusted: boolean;

  readonly lastSeenAt: Date;

  readonly createdAt: Date;
}