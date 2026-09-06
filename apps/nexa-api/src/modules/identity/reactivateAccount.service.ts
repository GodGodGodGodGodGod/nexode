import type {
  IdentityUser,
  UserRepository,
} from '@nexode/identity';

export class ReactivateAccountService {
  constructor(
    private readonly users: UserRepository,
  ) {}

  async reactivate(
    email: string,
  ): Promise<void> {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.users.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new Error(
        'Account not found.',
      );
    }

    if (user.enabled) {
      throw new Error(
        'Account is already active.',
      );
    }

    const updatedUser: IdentityUser = {
      ...user,
      enabled: true,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );
  }
}