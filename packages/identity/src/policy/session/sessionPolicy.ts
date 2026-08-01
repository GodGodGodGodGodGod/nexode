export interface SessionPolicy {
  readonly maximumLifetimeMinutes: number;

  readonly idleTimeoutMinutes: number;

  readonly maximumConcurrentSessions?: number;

  readonly rememberMeLifetimeMinutes?: number;
}