export interface ProviderHealth {

  readonly healthy: boolean;

  readonly latency?: number;

  readonly lastCheckedAt?: Date;
}