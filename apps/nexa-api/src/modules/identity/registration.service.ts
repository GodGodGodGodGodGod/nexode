import type {
  PasswordHasher,
  UserRepository,
  IdentityUser,
  EmailVerificationService,
} from '@nexode/identity';

import type {
  RegisterUserRequest,
  IdentityResponse,
} from './identity.types.js';

import {
  normalizeUsername,
  validateUsername,
} from './username.validator.js';

import {
  PasswordPolicyService,
} from './passwordPolicy.service.js';

export class RegistrationService {
  constructor(
  private readonly users: UserRepository,
  private readonly passwordHasher: PasswordHasher,
  private readonly emailVerification:
    EmailVerificationService,
  private readonly passwordPolicy:
    PasswordPolicyService,
) {}

  async register(
    request: RegisterUserRequest,
  ): Promise<IdentityResponse> {
    const email =
      request.email.trim().toLowerCase();

    const password =
      request.password;

    if (!email) {
      throw new Error(
        'Email is required.',
      );
    }

    if (
      !email.includes('@')
    ) {
      throw new Error(
        'Email is invalid.',
      );
    }

    await this.passwordPolicy.validate(
  password,
);

    const existingUser =
      await this.users.findByEmail(
        email,
      );

    if (existingUser) {
      throw new Error(
        'A user with this email already exists.',
      );
    }

    const username =
  request.username
    ? normalizeUsername(
        request.username,
      )
    : undefined;

if (username) {
  validateUsername(
    username,
  );

  const existingUsername =
    await this.users.findByUsername(
      username,
    );

  if (existingUsername) {
    throw new Error(
      'This username is already taken.',
    );
  }
}

    const now = new Date();

    const passwordHash =
      await this.passwordHasher.hash(
        password,
      );

    const user: IdentityUser = {
      id: crypto.randomUUID(),
      email,
      username,
      displayName:
        request.displayName?.trim() ||
        undefined,
      roles: [],
      permissions: [],
      createdAt: now,
      updatedAt: now,
      enabled: true,
      emailVerified: false,
      passwordHash,
    };

    await this.users.save(user);

    const verificationToken =
  await this.emailVerification.createToken(
    user.id,
  );
    return {
      id: user.id,
      email: user.email,
      username: user.username,
       displayName: user.displayName,
       verificationToken:
      verificationToken.token,
      };
  }
}