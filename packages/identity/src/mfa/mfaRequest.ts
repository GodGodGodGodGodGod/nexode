export interface MfaRequest {
  readonly userId: string;

  readonly code: string;
}