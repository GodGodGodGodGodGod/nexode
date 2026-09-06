import type {
  IdentityUser,
  UserRepository,
  SessionStore,
} from '@nexode/identity';

export class DeactivateAccountService {
  constructor(
    private readonly users: UserRepository,
    private readonly sessions: SessionStore,
  ) {}

  async deactivate(
    userId: string,
  ): Promise<void> {
    const user =
      await this.users.findById(
        userId,
      );

    if (!user) {
      throw new Error(
        'User not found.',
      );
    }

    if (!user.enabled) {
      throw new Error(
        'Account is already deactivated.',
      );
    }

    const updatedUser: IdentityUser = {
      ...user,
      enabled: false,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );

    await this.sessions.deleteByUser(
      user.id,
    );
  }
}