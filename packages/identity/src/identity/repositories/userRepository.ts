import type {
  IdentityUser,
} from '../models/identityUser.js';

export interface UserRepository {
  findById(
    id: string,
  ): Promise<IdentityUser | undefined>;

  findByEmail(
    email: string,
  ): Promise<IdentityUser | undefined>;

  findByUsername(
  username: string,
): Promise<IdentityUser | undefined>;

  save(
    user: IdentityUser,
  ): Promise<void>;

delete(
  id: string,
): Promise<void>;
}