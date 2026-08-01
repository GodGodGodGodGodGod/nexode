import type {
  MfaProvider,
} from '../mfaProvider.js';

import type {
  MfaRequest,
} from '../mfaRequest.js';

import type {
  MfaResult,
} from '../mfaResult.js';

import type {
  TotpGenerator,
} from './totpGenerator.js';

import type {
  TotpStore,
} from './totpStore.js';

export class TotpProvider
  implements MfaProvider {

  constructor(
    private readonly store: TotpStore,
    private readonly generator: TotpGenerator,
  ) {}

  async verify(
    request: MfaRequest,
  ): Promise<MfaResult> {

    const secret =
      await this.store.findByUserId(
        request.userId,
      );

    if (!secret || !secret.enabled) {
      return {
        verified: false,
        reason: 'TOTP not configured',
      };
    }

    const valid =
      await this.generator.verify(
        secret.secret,
        request.code,
      );

    return {
      verified: valid,
      reason: valid
        ? undefined
        : 'Invalid TOTP code',
    };
  }
}