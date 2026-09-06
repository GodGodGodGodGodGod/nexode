import type {
  PasswordResetToken,
} from '../models/passwordResetToken.js';

export interface PasswordResetRepository {
  create(
    reset: PasswordResetToken,
  ): Promise<void>;

  findByToken(
    token: string,
  ): Promise<
    PasswordResetToken | undefined
  >;

  save(
    reset: PasswordResetToken,
  ): Promise<void>;
}