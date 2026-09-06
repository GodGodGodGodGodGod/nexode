import {
  generateSecret,
} from 'otplib';

import type {
  TotpSecretGenerator,
} from './totpSecretGenerator.js';

export class SecureTotpSecretGenerator
  implements TotpSecretGenerator {

  async generate(): Promise<string> {
    return generateSecret();
  }
}