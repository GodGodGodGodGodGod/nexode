import type {
  PasswordHasher,
  PasswordResetRepository,
  UserRepository,
  SessionManager,
  IdentityUser,
} from '@nexode/identity';
import type {
  ResetPasswordRequest,
} from './identity.types.js';

import {
  PasswordPolicyService,
} from './passwordPolicy.service.js';

export class ResetPasswordService {
  constructor(
  private readonly users:
    UserRepository,
  private readonly passwordHasher:
    PasswordHasher,
  private readonly passwordResets:
    PasswordResetRepository,
  private readonly sessions:
    SessionManager,
  private readonly passwordPolicy:
    PasswordPolicyService,
) {}

  async reset(
    request: ResetPasswordRequest,
  ): Promise<void> {
    const token =
      request.token.trim();

    const password =
      request.password;

    if (!token) {
      throw new Error(
        'Reset token is required.',
      );
    }

    await this.passwordPolicy.validate(
  password,
);

    const reset =
      await this.passwordResets.findByToken(
        token,
      );

    if (!reset) {
      throw new Error(
        'Invalid reset token.',
      );
    }

    if (reset.usedAt) {
      throw new Error(
        'Reset token has already been used.',
      );
    }

    if (
      reset.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new Error(
        'Reset token has expired.',
      );
    }

    const user =
      await this.users.findById(
        reset.userId,
      );

    if (!user) {
      throw new Error(
        'User not found.',
      );
    }

    const passwordHash =
      await this.passwordHasher.hash(
        password,
      );

    const updatedUser: IdentityUser = {
      ...user,
      passwordHash,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );

    await this.passwordResets.save({
      ...reset,
      usedAt: new Date(),
    });

    await this.sessions.revokeAllForUser(
      user.id,
    );
  }
}