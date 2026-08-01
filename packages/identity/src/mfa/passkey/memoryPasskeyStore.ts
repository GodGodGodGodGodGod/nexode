import type {
  PasskeyCredential,
} from './passkeyCredential.js';

import type {
  PasskeyStore,
} from './passkeyStore.js';

export class MemoryPasskeyStore
  implements PasskeyStore {

  private readonly credentials =
    new Map<
      string,
      PasskeyCredential
    >();

  async save(
    credential: PasskeyCredential,
  ): Promise<void> {

    this.credentials.set(
      credential.credentialId,
      credential,
    );
  }

  async findByCredentialId(
    credentialId: string,
  ): Promise<
    PasskeyCredential | undefined
  > {

    return this.credentials.get(
      credentialId,
    );
  }

  async updateSignCount(
    credentialId: string,
    signCount: number,
  ): Promise<void> {

    const credential =
      this.credentials.get(
        credentialId,
      );

    if (!credential) {
      return;
    }

    this.credentials.set(
      credentialId,
      {
        ...credential,
        signCount,
      },
    );
  }
}