import type {
  SessionManager,
} from '@nexode/identity';

import {
  parseDeviceInfo,
  type DeviceInfo,
} from './deviceInfo.js';

import {
  SecurityAuditService,
} from './securityAudit.service.js';

export interface UserSessionResponse {
  readonly id: string;

  readonly createdAt: Date;

  readonly expiresAt: Date;

  readonly lastActivityAt: Date;

  readonly ipAddress?: string;

  readonly userAgent?: string;

  readonly device: DeviceInfo;

  readonly current: boolean;
}

export class SessionService {
  constructor(
    private readonly sessions:
      SessionManager,
    private readonly securityAudit:
      SecurityAuditService,
  ) {}

  async getUserSessions(
  userId: string,
  currentSessionId: string,
): Promise<
  readonly UserSessionResponse[]
> {
  const sessions =
    await this.sessions.findByUser(
      userId,
    );

  return sessions.map(
  (session) => ({
    id: session.id,

    createdAt:
      session.createdAt,

    expiresAt:
      session.expiresAt,

    lastActivityAt:
      session.lastActivityAt,

    ipAddress:
      session.ipAddress,

    userAgent:
      session.userAgent,

    device:
      parseDeviceInfo(
        session.userAgent,
      ),

    current:
      session.id === currentSessionId,
  }),
);
}

  async revokeSession(
  userId: string,
  sessionId: string,
  currentSessionId: string,
): Promise<void> {
    const session =
      await this.sessions.find(
        sessionId,
      );

    if (!session) {
      throw new Error(
        'Session not found.',
      );
    }

    if (sessionId === currentSessionId) {
  throw new Error(
    'Use logout to revoke the current session.',
  );
}

    if (
      session.userId !== userId
    ) {
      throw new Error(
        'You cannot revoke this session.',
      );
    }

    await this.sessions.revoke(
      sessionId,
    );
    await this.securityAudit.record(
  userId,
  'SESSION_REVOKED',
  {
    revokedSessionId:
      sessionId,

    performedBySessionId:
      currentSessionId,

    reason:
      'USER_REVOKED',
  },
);
  }

  async revokeOtherSessions(
  userId: string,
  currentSessionId: string,
): Promise<void> {
  const sessions =
    await this.sessions.findByUser(
      userId,
    );

  let revokedCount = 0;

  for (const session of sessions) {
    if (
      session.id !== currentSessionId
    ) {
      await this.sessions.revoke(
        session.id,
      );

      revokedCount++;
    }
  }

  await this.securityAudit.record(
    userId,
    'OTHER_SESSIONS_REVOKED',
    {
      performedBySessionId:
        currentSessionId,

      revokedCount,

      reason:
        'USER_REVOKED_OTHERS',
    },
  );
}
}