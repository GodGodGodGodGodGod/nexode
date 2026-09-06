import type {
  IdentityUser,
} from '../models/identityUser.js';

import type {
  UserRepository,
} from './userRepository.js';

export class MemoryUserRepository
  implements UserRepository {

  private readonly users =
    new Map<string, IdentityUser>();

  async findById(
    id: string,
  ): Promise<IdentityUser | undefined> {
    return this.users.get(id);
  }

  async findByEmail(
    email: string,
  ): Promise<IdentityUser | undefined> {
    const normalizedEmail =
      email.toLowerCase();

    for (
      const user of this.users.values()
    ) {
      if (
        user.email.toLowerCase() ===
        normalizedEmail
      ) {
        return user;
      }
    }

    return undefined;
  }

  async findByUsername(
  username: string,
): Promise<IdentityUser | undefined> {
  const normalizedUsername =
    username.toLowerCase();

  for (
    const user of this.users.values()
  ) {
    if (
      user.username?.toLowerCase() ===
      normalizedUsername
    ) {
      return user;
    }
  }

  return undefined;
}

  async save(
    user: IdentityUser,
  ): Promise<void> {
    this.users.set(
      user.id,
      user,
    );
  }
  async delete(
  id: string,
): Promise<void> {
  this.users.delete(id);
}
}