import { createHash } from 'node:crypto';

import type {
  Hasher,
} from '../../interfaces.js';

import type {
  HashOptions,
} from '../../types.js';

export class NodeHasher
  implements Hasher
{
  async hash(
    value: string,
    _options?: HashOptions,
  ): Promise<string> {
    void _options;

    return createHash('sha256')
      .update(value)
      .digest('hex');
  }

  async verify(
    value: string,
    hash: string,
  ): Promise<boolean> {
    return (
      (await this.hash(value)) === hash
    );
  }
}