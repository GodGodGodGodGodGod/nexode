import type {
  MfaSecret,
} from './mfaSecret.js';

import type {
  MfaStore,
} from './mfaStore.js';

export class MemoryMfaStore
  implements MfaStore {
  private readonly secrets =
    new Map<string, MfaSecret>();

  async save(
    mfaSecret: MfaSecret,
  ): Promise<void> {
    this.secrets.set(
      mfaSecret.userId,
      mfaSecret,
    );
  }

  async findByUserId(
    userId: string,
  ): Promise<MfaSecret | undefined> {
    return this.secrets.get(
      userId,
    );
  }

  async delete(
    userId: string,
  ): Promise<void> {
    this.secrets.delete(
      userId,
    );
  }
}