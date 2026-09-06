export interface TotpSetupResult {
  readonly secret: string;

  readonly otpAuthUrl: string;
}