import type {
  PasskeyCredential,
} from './passkeyCredential.js';

export interface PasskeyStore {
  save(
    credential: PasskeyCredential,
  ): Promise<void>;

  findByCredentialId(
    credentialId: string,
  ): Promise<PasskeyCredential | undefined>;

  updateSignCount(
    credentialId: string,
    signCount: number,
  ): Promise<void>;
}