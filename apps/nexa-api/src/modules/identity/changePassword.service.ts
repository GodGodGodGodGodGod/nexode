import type {
  PasswordHasher,
  UserRepository,
  IdentityUser,
  SessionManager,
} from '@nexode/identity';

import {
  PasswordPolicyService,
} from './passwordPolicy.service.js';

import {
  SecurityAuditService,
} from './securityAudit.service.js';

export interface ChangePasswordRequest {
  readonly currentPassword: string;

  readonly newPassword: string;
}

export interface ChangePasswordMetadata {
  readonly sessionId: string;

  readonly ipAddress?: string;

  readonly userAgent?: string;
}

export class ChangePasswordService {
  constructor(
    private readonly users:
      UserRepository,

    private readonly passwordHasher:
      PasswordHasher,

    private readonly sessions:
      SessionManager,

    private readonly passwordPolicy:
      PasswordPolicyService,

    private readonly securityAudit:
      SecurityAuditService,
  ) {}

  async change(
    userId: string,
    request: ChangePasswordRequest,
    metadata: ChangePasswordMetadata,
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

    const passwordMatches =
      await this.passwordHasher.verify(
        request.currentPassword,
        user.passwordHash,
      );

    if (!passwordMatches) {
      throw new Error(
        'Current password is incorrect.',
      );
    }

    await this.passwordPolicy.validate(
      request.newPassword,
    );

    const passwordHash =
      await this.passwordHasher.hash(
        request.newPassword,
      );

    const updatedUser: IdentityUser = {
      ...user,
      passwordHash,
      updatedAt: new Date(),
    };

    await this.users.save(
      updatedUser,
    );

    const sessions =
      await this.sessions.findByUser(
        user.id,
      );

    let revokedCount = 0;

    for (const session of sessions) {
      if (
        session.id !== metadata.sessionId
      ) {
        await this.sessions.revoke(
          session.id,
        );

        revokedCount++;
      }
    }

    await this.securityAudit.record(
  user.id,
  'PASSWORD_CHANGED',
  {
    sessionId:
      metadata.sessionId,

    ipAddress:
      metadata.ipAddress,

    userAgent:
      metadata.userAgent,

    revokedOtherSessions:
      revokedCount,
  },
);
  }
}