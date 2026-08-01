import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryProviderHealthMonitor,
} from '../index.js';

describe(
  'MemoryProviderHealthMonitor',
  () => {

    it(
      'marks providers unhealthy',
      () => {

        const monitor =
          new MemoryProviderHealthMonitor();

        monitor.markUnhealthy(
          'provider-1',
        );

        expect(
          monitor.isHealthy(
            'provider-1',
          ),
        ).toBe(false);

      },
    );

    it(
      'marks providers healthy',
      () => {

        const monitor =
          new MemoryProviderHealthMonitor();

        monitor.markHealthy(
          'provider-1',
        );

        expect(
          monitor.isHealthy(
            'provider-1',
          ),
        ).toBe(true);

      },
    );

  },
);