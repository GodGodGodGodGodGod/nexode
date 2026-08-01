import type {
  RecoveryCode,
} from './recoveryCode.js';

import type {
  RecoveryCodeStore,
} from './recoveryCodeStore.js';

export class MemoryRecoveryCodeStore
  implements RecoveryCodeStore {

  private readonly codes =
    new Map<string, RecoveryCode>();

  async save(
    code: RecoveryCode,
  ): Promise<void> {

    this.codes.set(
      code.id,
      code,
    );
  }

  async findByCode(
    value: string,
  ): Promise<
    RecoveryCode | undefined
  > {

    for (const code of this.codes.values()) {
      if (code.code === value) {
        return code;
      }
    }

    return undefined;
  }

  async markAsUsed(
    id: string,
  ): Promise<void> {

    const code =
      this.codes.get(id);

    if (!code) {
      return;
    }

    this.codes.set(id, {
      ...code,
      used: true,
    });
  }
}