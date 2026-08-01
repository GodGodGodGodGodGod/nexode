import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  PriorityFailoverStrategy,
  ProviderStatus,
  ProviderType,
} from '../index.js';

describe(
  'PriorityFailoverStrategy',
  () => {

    it(
      'orders providers by priority',
      () => {

        const strategy =
          new PriorityFailoverStrategy();

        const ordered =
          strategy.order([
            {
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
},
            {
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
},
          ]);

        expect(
          ordered[0]?.id,
        ).toBe(
          'fast',
        );

      },
    );

  },
);