import type {
  IdentityUser,
  UserRepository,
  AccountReactivationRepository,
} from '@nexode/identity';

export class ConfirmAccountReactivationService {
  constructor(
    private readonly users: UserRepository,
    private readonly reactivations:
      AccountReactivationRepository,
  ) {}

  async confirm(
    tokenValue: string,
  ): Promise<void> {
    const token =
      await this.reactivations.findByToken(
        tokenValue,
      );

    if (!token) {
      throw new Error(
        'Invalid reactivation token.',
      );
    }

    if (token.usedAt) {
      throw new Error(
        'Reactivation token has already been used.',
      );
    }

    if (
      token.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new Error(
        'Reactivation token has expired.',
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

    if (user.enabled) {
      throw new Error(
        'Account is already active.',
      );
    }

    const now = new Date();

    const updatedUser: IdentityUser = {
      ...user,
      enabled: true,
      updatedAt: now,
    };

    await this.users.save(
      updatedUser,
    );

    await this.reactivations.save({
      ...token,
      usedAt: now,
    });
  }
}