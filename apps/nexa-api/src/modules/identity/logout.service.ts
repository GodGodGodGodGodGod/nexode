import type {
  SessionManager,
} from '@nexode/identity';

import {
  SecurityAuditService,
} from './securityAudit.service.js';

export class LogoutService {
  constructor(
    private readonly sessions:
      SessionManager,

    private readonly securityAudit:
      SecurityAuditService,
  ) {}

  async logout(
    userId: string,
    sessionId: string,
  ): Promise<void> {
    await this.sessions.revoke(
      sessionId,
    );

    await this.securityAudit.record(
      userId,
      'LOGOUT',
      {
        sessionId,
      },
    );
  }
}