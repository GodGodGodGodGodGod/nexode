import type {
  RecoveryCode,
} from './recoveryCode.js';

export interface RecoveryCodeStore {
  save(
    code: RecoveryCode,
  ): Promise<void>;

  findByCode(
    code: string,
  ): Promise<RecoveryCode | undefined>;

  markAsUsed(
    id: string,
  ): Promise<void>;
}