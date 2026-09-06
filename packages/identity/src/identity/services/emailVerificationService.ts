import type {
  IdentityUser,
} from '../models/identityUser.js';

import type {
  UserRepository,
} from '../repositories/userRepository.js';

import type {
  EmailVerificationRepository,
} from '../repositories/emailVerificationRepository.js';

import type {
  EmailVerificationToken,
} from '../models/emailVerificationToken.js';

export class EmailVerificationService {

  constructor(
    private readonly users: UserRepository,
    private readonly tokens:
      EmailVerificationRepository,
  ) {}

  async createToken(
    userId: string,
  ): Promise<EmailVerificationToken> {

    const user =
      await this.users.findById(
        userId,
      );

    if (!user) {
      throw new Error(
        'User not found.',
      );
    }

    if (user.emailVerified) {
      throw new Error(
        'Email is already verified.',
      );
    }

    await this.tokens.deleteByUserId(
      userId,
    );

    const now = new Date();

    const token: EmailVerificationToken = {
      id: crypto.randomUUID(),
      userId,
      token: crypto.randomUUID(),
      createdAt: now,
      expiresAt: new Date(
        now.getTime() +
        1000 * 60 * 60 * 24,
      ),
    };

    await this.tokens.save(
      token,
    );

    return token;
  }

  async verify(
    tokenValue: string,
  ): Promise<void> {

    const token =
      await this.tokens.findByToken(
        tokenValue,
      );

    if (!token) {
      throw new Error(
        'Invalid verification token.',
      );
    }

    if (token.usedAt) {
      throw new Error(
        'Verification token has already been used.',
      );
    }

    if (
      token.expiresAt.getTime() <
      Date.now()
    ) {
      throw new Error(
        'Verification token has expired.',
      );
    }

    const user =
      await this.users.findById(
        token.userId,
      );

    if (!user) {
      throw new Error(
        'User not found.',
      );
    }

    const updatedUser: IdentityUser = {
      ...user,
      emailVerified: true,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );

    const usedToken: EmailVerificationToken = {
      ...token,
      usedAt: new Date(),
    };

    await this.tokens.update(
      usedToken,
    );
  }
}