export interface PasswordPolicy {

  readonly minimumLength: number;

  readonly maximumLength?: number;

  readonly requireUppercase: boolean;

  readonly requireLowercase: boolean;

  readonly requireNumbers: boolean;

  readonly requireSymbols: boolean;
}