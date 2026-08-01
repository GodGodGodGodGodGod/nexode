import type {
  ProviderHealthMonitor,
} from './providerHealthMonitor.js';

export class ProviderHealthService {

  constructor(
    private readonly monitor:
      ProviderHealthMonitor,
  ) {}

  healthy(
    providerId: string,
  ): boolean {

    return this.monitor.isHealthy(
      providerId,
    );

  }

}