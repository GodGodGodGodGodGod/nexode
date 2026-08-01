import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryProviderAdapterFactory,
  ProviderStatus,
  ProviderType,
} from '../index.js';

describe(
  'MemoryProviderAdapterFactory',
  () => {

    it(
      'registers adapters',
      () => {

        const factory =
          new MemoryProviderAdapterFactory();

        factory.register({

          provider: {
  id: 'provider-1',
  type: ProviderType.AI,
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
},

          connect: async () => {},

          disconnect: async () => {},

          healthCheck: async () => true,

        });

        expect(
          factory.list(),
        ).toHaveLength(1);

      },
    );

  },
);