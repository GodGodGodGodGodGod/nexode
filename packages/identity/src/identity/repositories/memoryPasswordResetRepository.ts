import type {
  PasswordResetToken,
} from '../models/passwordResetToken.js';

import type {
  PasswordResetRepository,
} from './passwordResetRepository.js';

export class MemoryPasswordResetRepository
  implements PasswordResetRepository {

  private readonly resets =
    new Map<string, PasswordResetToken>();

  async create(
    reset: PasswordResetToken,
  ): Promise<void> {
    this.resets.set(
      reset.token,
      reset,
    );
  }

  async findByToken(
    token: string,
  ): Promise<
    PasswordResetToken | undefined
  > {
    return this.resets.get(token);
  }

  async save(
    reset: PasswordResetToken,
  ): Promise<void> {
    this.resets.set(
      reset.token,
      reset,
    );
  }
}