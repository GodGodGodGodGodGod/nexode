import type {
  IdentityUser,
  UserRepository,
} from '@nexode/identity';

import {
  normalizeUsername,
  validateUsername,
} from './username.validator.js';

export interface UpdateProfileRequest {
  readonly username?: string;

  readonly displayName?: string;
}

export interface UpdateProfileResponse {
  readonly id: string;

  readonly username?: string;

  readonly displayName?: string;
}

export class UpdateProfileService {
  constructor(
    private readonly users: UserRepository,
  ) {}

  async update(
    userId: string,
    request: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> {
    const user =
      await this.users.findById(
        userId,
      );

    if (!user) {
      throw new Error(
        'User not found.',
      );
    }

    let username =
      user.username;

    let displayName =
      user.displayName;

    if (
      request.username !== undefined
    ) {

      const normalizedUsername =
  normalizeUsername(
    request.username,
  );

if (!normalizedUsername) {
  throw new Error(
    'Username cannot be empty.',
  );
}

validateUsername(
  normalizedUsername,
);

const existingUser =
  await this.users.findByUsername(
    normalizedUsername,
  );

if (
  existingUser &&
  existingUser.id !== user.id
) {
  throw new Error(
    'Username is already taken.',
  );
}

username =
  normalizedUsername;
    }

    if (
      request.displayName !== undefined
    ) {
      const normalizedDisplayName =
        request.displayName.trim();

      if (!normalizedDisplayName) {
        throw new Error(
          'Display name cannot be empty.',
        );
      }

      displayName =
        normalizedDisplayName;
    }

    const updatedUser: IdentityUser = {
      ...user,
      username,
      displayName,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      displayName: updatedUser.displayName,
    };
  }
}