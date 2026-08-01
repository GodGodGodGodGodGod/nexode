export interface AuthenticationResult {
  readonly authenticated: boolean;

  readonly userId?: string;

  readonly sessionId?: string;

  readonly reason?: string;
}