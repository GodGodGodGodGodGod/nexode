import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryProviderRegistry,
  ProviderStatus,
  ProviderType,
} from '../index.js';

describe(
  'MemoryProviderRegistry',
  () => {

    it(
      'registers a provider',
      () => {

        const registry =
          new MemoryProviderRegistry();

        registry.register({

          id: 'provider-1',

          type: ProviderType.PAYMENT,

          status: ProviderStatus.ACTIVE,

          priority: 1,

          metadata: {
            displayName: 'Test Provider',
          },

          health: {
            healthy: true,
          },

          capabilities: [],

          regions: [],

        });

        expect(
          registry.list(),
        ).toHaveLength(1);

      },
    );

  },
);