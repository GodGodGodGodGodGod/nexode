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
  RecoveryCodeStore,
} from './recoveryCodeStore.js';

export class RecoveryCodeProvider
  implements MfaProvider {

  constructor(
    private readonly store: RecoveryCodeStore,
  ) {}

  async verify(
    request: MfaRequest,
  ): Promise<MfaResult> {

    const recoveryCode =
      await this.store.findByCode(
        request.code,
      );

    if (
      !recoveryCode ||
      recoveryCode.used ||
      recoveryCode.userId !== request.userId
    ) {
      return {
        verified: false,
        reason: 'Invalid recovery code',
      };
    }

    await this.store.markAsUsed(
      recoveryCode.id,
    );

    return {
      verified: true,
    };
  }
}