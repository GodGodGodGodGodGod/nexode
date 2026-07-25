import { Buffer } from 'node:buffer';
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from 'node:crypto';

import type {
  CryptoProvider,
} from '../../interfaces.js';

import type {
  EncryptionResult,
  RandomOptions,
} from '../../types.js';

export class NodeCrypto
  implements CryptoProvider
{
  constructor(
    private readonly secret: Buffer,
  ) {}

  async encrypt(
    value: string,
  ): Promise<EncryptionResult> {
    const iv = randomBytes(16);

    const cipher = createCipheriv(
      'aes-256-gcm',
      this.secret,
      iv,
    );

    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  async decrypt(
    payload: EncryptionResult,
  ): Promise<string> {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.secret,
      Buffer.from(payload.iv, 'hex'),
    );

    decipher.setAuthTag(
      Buffer.from(payload.tag, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(
        Buffer.from(
          payload.content,
          'hex',
        ),
      ),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }

  async random(
    options?: RandomOptions,
  ): Promise<string> {
    const length =
      options?.length ?? 32;

    return randomBytes(length).toString(
      'hex',
    );
  }

  async sign(
    value: string,
  ): Promise<string> {
    return createHmac(
      'sha256',
      this.secret,
    )
      .update(value)
      .digest('hex');
  }

  async verify(
    value: string,
    signature: string,
  ): Promise<boolean> {
    return (
      (await this.sign(value)) ===
      signature
    );
  }
}