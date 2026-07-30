import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  IdentityService,
} from './identityService.js';

describe(
  'IdentityService',
  () => {
    it(
      'should create an instance',
      () => {
        const service =
          new IdentityService();

        expect(service)
          .toBeDefined();
      },
    );
  },
);