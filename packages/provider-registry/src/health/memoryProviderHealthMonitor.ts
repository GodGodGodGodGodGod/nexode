import type {
  ProviderHealthMonitor,
} from './providerHealthMonitor.js';

export class MemoryProviderHealthMonitor
  implements ProviderHealthMonitor {

  private readonly states =
    new Map<
      string,
      boolean
    >();

  isHealthy(
    providerId: string,
  ): boolean {

    return this.states.get(
      providerId,
    ) ?? true;

  }

  markHealthy(
    providerId: string,
  ): void {

    this.states.set(
      providerId,
      true,
    );

  }

  markUnhealthy(
    providerId: string,
  ): void {

    this.states.set(
      providerId,
      false,
    );

  }

}