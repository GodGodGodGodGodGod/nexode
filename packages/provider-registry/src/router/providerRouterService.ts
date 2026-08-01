import type {
  Provider,
} from '../provider/provider.js';

import {
  ProviderStatus,
} from '../provider/providerStatus.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

import type {
  ProviderDiscovery,
} from '../discovery/providerDiscovery.js';

import type {
  ProviderRouter,
} from './providerRouter.js';

import type {
  ProviderHealthMonitor,
} from '../health/providerHealthMonitor.js';

export class ProviderRouterService
  implements ProviderRouter {

  constructor(
  private readonly discovery: ProviderDiscovery,
  private readonly health: ProviderHealthMonitor,
) {}

  select(
    type: ProviderType,
  ): Provider | undefined {

    const providers =
      this.discovery
        .findByType(type)
        .filter(
  provider =>
    provider.status ===
      ProviderStatus.ACTIVE &&
    this.health.isHealthy(
      provider.id,
    ),
)
        .sort(
          (left, right) =>
            left.priority -
            right.priority,
        );

    return providers[0];

  }

}