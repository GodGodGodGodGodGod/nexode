import type {
  TotpSecret,
} from './totpSecret.js';

import type {
  TotpStore,
} from './totpStore.js';

import type {
  TotpGenerator,
} from './totpGenerator.js';

import type {
  TotpSecretGenerator,
} from './totpSecretGenerator.js';

import type {
  TotpUriGenerator,
} from './totpUriGenerator.js';

import type {
  TotpSetupResult,
} from './totpSetupResult.js';

export class TotpSetupService {
  constructor(
    private readonly store:
      TotpStore,

    private readonly generator:
      TotpGenerator,

    private readonly secretGenerator:
      TotpSecretGenerator,

    private readonly uriGenerator:
      TotpUriGenerator,
  ) {}

  async setup(
    userId: string,
    email: string,
  ): Promise<TotpSetupResult> {
    const secret =
      await this.secretGenerator.generate();

    const totpSecret: TotpSecret = {
      userId,
      secret,
      enabled: false,
      createdAt: new Date(),
    };

    await this.store.save(
      totpSecret,
    );

    const otpAuthUrl =
      this.uriGenerator.generate(
        secret,
        'NeXa',
        email,
      );

    return {
      secret,
      otpAuthUrl,
    };
  }

  async confirm(
    userId: string,
    code: string,
  ): Promise<boolean> {
    const secret =
      await this.store.findByUserId(
        userId,
      );

    if (!secret) {
      return false;
    }

    const valid =
      await this.generator.verify(
        secret.secret,
        code,
      );

    if (!valid) {
      return false;
    }

    await this.store.save({
      ...secret,
      enabled: true,
    });

    return true;
  }
}