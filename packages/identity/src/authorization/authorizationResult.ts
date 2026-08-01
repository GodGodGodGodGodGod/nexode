export interface AuthorizationResult {

  readonly allowed: boolean;

  readonly reason?: string;
}