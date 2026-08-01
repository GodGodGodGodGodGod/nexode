import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryProviderRegistry,
  ProviderDiscoveryService,
  ProviderRouterService,
  ProviderStatus,
  ProviderType,
  MemoryProviderHealthMonitor,
} from '../index.js';

describe(
  'ProviderRouterService',
  () => {

    it(
      'selects the highest priority active provider',
      () => {

        const registry =
          new MemoryProviderRegistry();

        registry.register({

          id: 'slow',

          type: ProviderType.AI,

          status: ProviderStatus.ACTIVE,

          priority: 10,

          metadata: {
            displayName: 'Slow',
          },

          health: {
            healthy: true,
          },

          capabilities: [],

          regions: [],

        });

        registry.register({

          id: 'fast',

          type: ProviderType.AI,

          status: ProviderStatus.ACTIVE,

          priority: 1,

          metadata: {
            displayName: 'Fast',
          },

          health: {
            healthy: true,
          },

          capabilities: [],

          regions: [],

        });

        const discovery =
          new ProviderDiscoveryService(
            registry,
          );

        const monitor =
  new MemoryProviderHealthMonitor();

const router =
  new ProviderRouterService(
    discovery,
    monitor,
  );

        expect(
          router.select(
            ProviderType.AI,
          )?.id,
        ).toBe(
          'fast',
        );

      },
    );

  },
);
it(
  'ignores unhealthy providers',
  () => {

    const registry =
      new MemoryProviderRegistry();

    registry.register({

      id: 'healthy',

      type: ProviderType.AI,

      status: ProviderStatus.ACTIVE,

      priority: 10,

      metadata: {
        displayName: 'Healthy',
      },

      health: {
        healthy: true,
      },

      capabilities: [],

      regions: [],

    });

    registry.register({

      id: 'unhealthy',

      type: ProviderType.AI,

      status: ProviderStatus.ACTIVE,

      priority: 1,

      metadata: {
        displayName: 'Unhealthy',
      },

      health: {
        healthy: true,
      },

      capabilities: [],

      regions: [],

    });

    const discovery =
      new ProviderDiscoveryService(
        registry,
      );

    const monitor =
      new MemoryProviderHealthMonitor();

    monitor.markUnhealthy(
      'unhealthy',
    );

    const router =
      new ProviderRouterService(
        discovery,
        monitor,
      );

    expect(
      router.select(
        ProviderType.AI,
      )?.id,
    ).toBe(
      'healthy',
    );

  },
);