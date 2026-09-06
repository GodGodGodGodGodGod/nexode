import type {
  IdentityUser,
  UserRepository,
} from '@nexode/identity';

export interface UserProfile {
  readonly id: string;

  readonly email: string;

  readonly username?: string;

  readonly displayName?: string;

  readonly roles: readonly string[];

  readonly permissions: readonly string[];

  readonly enabled: boolean;

  readonly createdAt: Date;
}

export class UserService {
  constructor(
    private readonly users: UserRepository,
  ) {}

  async getById(
    id: string,
  ): Promise<UserProfile | undefined> {
    const user =
      await this.users.findById(id);

    if (!user) {
      return undefined;
    }

    return this.toProfile(user);
  }

  private toProfile(
    user: IdentityUser,
  ): UserProfile {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      roles: user.roles,
      permissions: user.permissions,
      enabled: user.enabled,
      createdAt: user.createdAt,
    };
  }
}