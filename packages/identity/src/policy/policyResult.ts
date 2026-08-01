export interface PolicyResult {
  readonly allowed: boolean;

  readonly reason?: string;
}