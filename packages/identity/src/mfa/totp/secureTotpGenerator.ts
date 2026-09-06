import {
  generate,
  verify,
} from 'otplib';

import type {
  TotpGenerator,
} from './totpGenerator.js';

export class SecureTotpGenerator
  implements TotpGenerator {

  async generate(
    secret: string,
  ): Promise<string> {
    return generate({
      secret,
    });
  }

  async verify(
    secret: string,
    code: string,
  ): Promise<boolean> {
    const result =
      await verify({
        secret,
        token: code,
      });

    return result.valid;
  }
}