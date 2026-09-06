import type {
  EmailVerificationToken,
} from '../models/emailVerificationToken.js';

import type {
  EmailVerificationRepository,
} from './emailVerificationRepository.js';

export class MemoryEmailVerificationRepository
  implements EmailVerificationRepository {

  private readonly tokens =
    new Map<
      string,
      EmailVerificationToken
    >();

  async findByToken(
    token: string,
  ): Promise<
    EmailVerificationToken | undefined
  > {
    return this.tokens.get(token);
  }

  async findByUserId(
    userId: string,
  ): Promise<
    EmailVerificationToken | undefined
  > {
    for (
      const token of this.tokens.values()
    ) {
      if (token.userId === userId) {
        return token;
      }
    }

    return undefined;
  }

  async save(
    token: EmailVerificationToken,
  ): Promise<void> {
    this.tokens.set(
      token.token,
      token,
    );
  }

  async update(
    token: EmailVerificationToken,
  ): Promise<void> {
    this.tokens.set(
      token.token,
      token,
    );
  }

  async deleteByUserId(
    userId: string,
  ): Promise<void> {
    for (
      const [
        key,
        token,
      ] of this.tokens
    ) {
      if (token.userId === userId) {
        this.tokens.delete(key);
      }
    }
  }
}