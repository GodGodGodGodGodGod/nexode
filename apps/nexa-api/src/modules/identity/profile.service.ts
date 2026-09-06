import type {
  UserRepository,
  IdentityUser,
} from '@nexode/identity';

export interface PublicProfile {
  readonly id: string;

  readonly username?: string;

  readonly displayName?: string;

  readonly createdAt: Date;
}

export class ProfileService {
  constructor(
    private readonly users: UserRepository,
  ) {}

  async getByUsername(
    username: string,
  ): Promise<PublicProfile | undefined> {
    const normalizedUsername =
      username.trim().toLowerCase();

    if (!normalizedUsername) {
      return undefined;
    }

    const user =
      await this.users.findByUsername(
        normalizedUsername,
      );

    if (!user) {
      return undefined;
    }

    return this.toPublicProfile(
      user,
    );
  }

  private toPublicProfile(
    user: IdentityUser,
  ): PublicProfile {
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      createdAt: user.createdAt,
    };
  }
}