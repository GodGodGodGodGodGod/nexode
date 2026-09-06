import type {
  TotpSecret,
} from './totpSecret.js';

import type {
  TotpStore,
} from './totpStore.js';

export class MemoryTotpStore
  implements TotpStore {

  private readonly secrets =
    new Map<string, TotpSecret>();

  async save(
    secret: TotpSecret,
  ): Promise<void> {
    this.secrets.set(
      secret.userId,
      secret,
    );
  }

  async findByUserId(
    userId: string,
  ): Promise<
    TotpSecret | undefined
  > {
    return this.secrets.get(
      userId,
    );
  }

  async deleteByUserId(
    userId: string,
  ): Promise<void> {
    this.secrets.delete(
      userId,
    );
  }
}