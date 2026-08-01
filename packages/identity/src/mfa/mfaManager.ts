import type {
  MfaProvider,
} from './mfaProvider.js';

import type {
  MfaRequest,
} from './mfaRequest.js';

import type {
  MfaResult,
} from './mfaResult.js';

export class MfaManager {
  constructor(
    private readonly provider: MfaProvider,
  ) {}

  verify(
    request: MfaRequest,
  ): Promise<MfaResult> {
    return this.provider.verify(
      request,
    );
  }
}