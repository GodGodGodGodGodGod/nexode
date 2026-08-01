import type {
  MfaRequest,
} from './mfaRequest.js';

import type {
  MfaResult,
} from './mfaResult.js';

export interface MfaProvider {
  verify(
    request: MfaRequest,
  ): Promise<MfaResult>;
}