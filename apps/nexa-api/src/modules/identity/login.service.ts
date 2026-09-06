import type {
  PasswordHasher,
  UserRepository,
  SessionManager,
  TotpStore,
  MfaLoginChallengeStore,
} from '@nexode/identity';

import type {
  LoginRequest,
  LoginResponse,
} from './identity.types.js';

import type {
  LoginMetadata,
} from './loginMetadata.js';

import {
  SecurityAuditService,
} from './securityAudit.service.js';

export class LoginService {
  constructor(
  private readonly users: UserRepository,
  private readonly passwordHasher: PasswordHasher,
  private readonly sessions: SessionManager,
  private readonly securityAudit:
    SecurityAuditService,
  private readonly totpStore:
    TotpStore,
  private readonly mfaChallenges: MfaLoginChallengeStore,
) {}

  async login(
  request: LoginRequest,
  metadata?: LoginMetadata,
): Promise<LoginResponse>
{
    const email =
      request.email.trim().toLowerCase();

    const password =
      request.password;

    if (!email || !password) {
      throw new Error(
        'Email and password are required.',
      );
    }

    const user =
      await this.users.findByEmail(
        email,
      );

    if (!user) {
      throw new Error(
        'Invalid email or password.',
      );
    }

    if (!user.enabled) {
      throw new Error(
        'This account has been disabled.',
      );
    }

    const valid =
      await this.passwordHasher.verify(
        password,
        user.passwordHash,
      );

    if (!valid) {
      throw new Error(
        'Invalid email or password.',
      );
    }

const totpSecret =
  await this.totpStore.findByUserId(
    user.id,
  );

if (totpSecret?.enabled) {
  const now = new Date();

  const challenge = {
    id: crypto.randomUUID(),
    userId: user.id,
    email: user.email,
    ipAddress: metadata?.ipAddress,
    userAgent: metadata?.userAgent,
    createdAt: now,
    expiresAt: new Date(
      now.getTime() + 5 * 60 * 1000,
    ),
  };

  await this.mfaChallenges.save(
    challenge,
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
    },
    mfaRequired: true,
    mfaMethod: 'totp',
    challengeId: challenge.id,
  };
}

    const now = new Date();

const session =
  await this.sessions.create({
    id: crypto.randomUUID(),
    userId: user.id,
    createdAt: now,
    ipAddress:
      metadata?.ipAddress,
    userAgent:
      metadata?.userAgent,
  });

  await this.securityAudit.record(
  user.id,
  'LOGIN_SUCCESS',
  {
    ipAddress:
      metadata?.ipAddress,

    userAgent:
      metadata?.userAgent,

    sessionId:
      session.id,
  },
);

    return {
  user: {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
  },
  sessionId: session.id,
  expiresAt:
    session.expiresAt.toISOString(),
};
  }
}