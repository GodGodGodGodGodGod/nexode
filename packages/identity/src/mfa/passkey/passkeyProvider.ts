import type {
  MfaProvider,
} from '../mfaProvider.js';

import type {
  MfaRequest,
} from '../mfaRequest.js';

import type {
  MfaResult,
} from '../mfaResult.js';

export class PasskeyProvider
  implements MfaProvider {

  async verify(
    request: MfaRequest,
  ): Promise<MfaResult> {

    void request;

    return {
      verified: false,
      reason: 'WebAuthn not implemented',
    };
  }
}