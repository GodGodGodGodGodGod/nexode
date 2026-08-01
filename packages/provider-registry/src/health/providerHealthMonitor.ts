export interface ProviderHealthMonitor {

  isHealthy(
    providerId: string,
  ): boolean;

  markHealthy(
    providerId: string,
  ): void;

  markUnhealthy(
    providerId: string,
  ): void;

}