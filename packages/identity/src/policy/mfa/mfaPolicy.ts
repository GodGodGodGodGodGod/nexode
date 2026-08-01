export interface MfaPolicy {

  readonly required: boolean;

  readonly requireForAdministrators: boolean;

  readonly requireForHighRisk: boolean;

  readonly requireForNewDevice: boolean;

  readonly requireAfterPasswordReset: boolean;
}