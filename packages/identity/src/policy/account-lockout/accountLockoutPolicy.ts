export interface AccountLockoutPolicy {

  readonly maximumFailedAttempts: number;

  readonly lockoutDurationMinutes: number;

  readonly permanentAfterMaximum: boolean;
}