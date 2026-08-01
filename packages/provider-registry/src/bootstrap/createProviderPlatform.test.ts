import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  createProviderPlatform,
} from '../index.js';

describe(
  'createProviderPlatform',
  () => {

    it(
      'creates a complete provider platform',
      () => {

        const platform =
          createProviderPlatform();

        expect(
          platform.registry,
        ).toBeDefined();

        expect(
          platform.discovery,
        ).toBeDefined();

        expect(
          platform.router,
        ).toBeDefined();

        expect(
          platform.health,
        ).toBeDefined();

        expect(
          platform.failover,
        ).toBeDefined();

        expect(
          platform.adapters,
        ).toBeDefined();

      },
    );

  },
);