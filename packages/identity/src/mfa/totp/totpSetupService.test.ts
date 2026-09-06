import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  MemoryTotpStore,
} from './memoryTotpStore.js';

import {
  SecureTotpGenerator,
} from './secureTotpGenerator.js';

import {
  SecureTotpSecretGenerator,
} from './secureTotpSecretGenerator.js';

import {
  StandardTotpUriGenerator,
} from './standardTotpUriGenerator.js';

import {
  TotpSetupService,
} from './totpSetupService.js';

describe(
  'TotpSetupService',
  () => {
    it(
      'creates a disabled TOTP setup',
      async () => {
        const store =
          new MemoryTotpStore();

        const generator =
          new SecureTotpGenerator();

        const secretGenerator =
          new SecureTotpSecretGenerator();

        const uriGenerator =
          new StandardTotpUriGenerator();

        const service =
          new TotpSetupService(
            store,
            generator,
            secretGenerator,
            uriGenerator,
          );

        const result =
          await service.setup(
            'user-1',
            'user@nexa.com',
          );

        expect(
          result.secret,
        ).toBeTruthy();

        expect(
          result.otpAuthUrl,
        ).toContain(
          'otpauth://totp/',
        );

        const stored =
          await store.findByUserId(
            'user-1',
          );

        expect(
          stored,
        ).toBeDefined();

        expect(
          stored?.enabled,
        ).toBe(false);

        expect(
          stored?.secret,
        ).toBe(
          result.secret,
        );
      },
    );

    it(
      'enables TOTP after confirming a valid code',
      async () => {
        const store =
          new MemoryTotpStore();

        const generator =
          new SecureTotpGenerator();

        const secretGenerator =
          new SecureTotpSecretGenerator();

        const uriGenerator =
          new StandardTotpUriGenerator();

        const service =
          new TotpSetupService(
            store,
            generator,
            secretGenerator,
            uriGenerator,
          );

        const setup =
          await service.setup(
            'user-2',
            'user2@nexa.com',
          );

        const code =
          await generator.generate(
            setup.secret,
          );

        const confirmed =
          await service.confirm(
            'user-2',
            code,
          );

        expect(
          confirmed,
        ).toBe(true);

        const stored =
          await store.findByUserId(
            'user-2',
          );

        expect(
          stored?.enabled,
        ).toBe(true);
      },
    );

    it(
      'rejects an invalid TOTP code',
      async () => {
        const store =
          new MemoryTotpStore();

        const generator =
          new SecureTotpGenerator();

        const secretGenerator =
          new SecureTotpSecretGenerator();

        const uriGenerator =
          new StandardTotpUriGenerator();

        const service =
          new TotpSetupService(
            store,
            generator,
            secretGenerator,
            uriGenerator,
          );

        await service.setup(
          'user-3',
          'user3@nexa.com',
        );

        const confirmed =
          await service.confirm(
            'user-3',
            '000000',
          );

        expect(
          confirmed,
        ).toBe(false);

        const stored =
          await store.findByUserId(
            'user-3',
          );

        expect(
          stored?.enabled,
        ).toBe(false);
      },
    );
  },
);