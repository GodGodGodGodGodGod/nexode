import {
  MemoryProviderRegistry,
} from '../registry/index.js';

import {
  ProviderDiscoveryService,
} from '../discovery/index.js';

import {
  MemoryProviderHealthMonitor,
} from '../health/index.js';

import {
  ProviderRouterService,
} from '../router/index.js';

import {
  PriorityFailoverStrategy,
} from '../failover/index.js';

import {
  MemoryProviderAdapterFactory,
} from '../adapters/index.js';

import type {
  ProviderPlatform,
} from './providerPlatform.js';

export function createProviderPlatform():
  ProviderPlatform {

  const registry =
    new MemoryProviderRegistry();

  const discovery =
    new ProviderDiscoveryService(
      registry,
    );

  const health =
    new MemoryProviderHealthMonitor();

  const router =
    new ProviderRouterService(
      discovery,
      health,
    );

  const failover =
    new PriorityFailoverStrategy();

  const adapters =
    new MemoryProviderAdapterFactory();

  return {

    registry,

    discovery,

    router,

    health,

    failover,

    adapters,

  };

}