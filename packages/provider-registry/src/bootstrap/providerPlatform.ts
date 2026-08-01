import type {
  ProviderRegistry,
} from '../registry/providerRegistry.js';

import type {
  ProviderDiscovery,
} from '../discovery/providerDiscovery.js';

import type {
  ProviderRouter,
} from '../router/providerRouter.js';

import type {
  ProviderHealthMonitor,
} from '../health/providerHealthMonitor.js';

import type {
  ProviderFailoverStrategy,
} from '../failover/providerFailoverStrategy.js';

import type {
  ProviderAdapterFactory,
} from '../adapters/providerAdapterFactory.js';

export interface ProviderPlatform {

  readonly registry: ProviderRegistry;

  readonly discovery: ProviderDiscovery;

  readonly router: ProviderRouter;

  readonly health: ProviderHealthMonitor;

  readonly failover: ProviderFailoverStrategy;

  readonly adapters: ProviderAdapterFactory;

}