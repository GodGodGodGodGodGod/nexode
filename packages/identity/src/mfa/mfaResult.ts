export interface MfaResult {
  readonly verified: boolean;

  readonly reason?: string;
}