import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryProviderRegistry,
  ProviderDiscoveryService,
  ProviderStatus,
  ProviderType,
} from '../index.js';

describe(
  'ProviderDiscoveryService',
  () => {

    it(
      'finds providers by type',
      () => {

        const registry =
          new MemoryProviderRegistry();

        registry.register({

          id: 'provider-1',

          type: ProviderType.AI,

          status: ProviderStatus.ACTIVE,

          priority: 1,

          metadata: {
            displayName: 'AI Provider',
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

        expect(
          discovery.findByType(
            ProviderType.AI,
          ),
        ).toHaveLength(1);

      },
    );

  },
);