export interface ApiKeyPolicy {

  readonly expirationDays?: number;

  readonly requireRotation: boolean;

  readonly allowIpRestriction: boolean;

  readonly maximumScopes?: number;
}