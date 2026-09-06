import type {
  MfaSecret,
} from './mfaSecret.js';

export interface MfaStore {
  save(
    mfaSecret: MfaSecret,
  ): Promise<void>;

  findByUserId(
    userId: string,
  ): Promise<MfaSecret | undefined>;

  delete(
    userId: string,
  ): Promise<void>;
}