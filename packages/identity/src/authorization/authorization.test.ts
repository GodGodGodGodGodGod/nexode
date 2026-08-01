import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  AuthorizationEngine,
  AuthorizationBootstrap,
  MemoryAuthorizationRegistry,
} from './index.js';

import {
  AuthorizationStrategy,
} from './authorizationStrategy.js';

import type {
  AuthorizationRequest,
} from './authorizationRequest.js';

const request: AuthorizationRequest = {

  subject: {

    id: 'user-1',

    roles: [

      {

        name: 'admin',

        permissions: [

          {
            name: 'users.read',
          },

          {
            name: 'users.write',
          },

        ],

      },

    ],

  },

  permission: {

    name: 'users.read',

  },

};

describe(
  'RBAC',
  () => {

    it(
      'allows granted permissions',
      async () => {

        const registry =
          new MemoryAuthorizationRegistry();

        new AuthorizationBootstrap(
          registry,
        ).registerDefaults();

        const authorizer =
          registry.find(
            AuthorizationStrategy.RBAC,
          );

        expect(
          authorizer,
        ).toBeDefined();

        const result =
          await authorizer!.authorize(
            request,
          );

        expect(
          result.allowed,
        ).toBe(true);

      },
    );

  },
);

describe(
  'AuthorizationEngine',
  () => {

    it(
      'delegates to the registered strategy',
      async () => {

        const registry =
          new MemoryAuthorizationRegistry();

        new AuthorizationBootstrap(
          registry,
        ).registerDefaults();

        const engine =
          new AuthorizationEngine(
            registry,
          );

        const result =
          await engine.authorize(
            request,
          );

        expect(
          result.allowed,
        ).toBe(true);

      },
    );

  },
);
