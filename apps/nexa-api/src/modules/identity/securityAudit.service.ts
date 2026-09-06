import {
  AuditManager,
} from '@nexode/identity';

import type {
  AuditEvent,
} from '@nexode/identity';

export type SecurityAction =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'SESSION_REVOKED'
  | 'OTHER_SESSIONS_REVOKED'
  | 'PASSWORD_CHANGED'
  | 'ACCOUNT_DEACTIVATED'
  | 'ACCOUNT_REACTIVATED';

export interface SecurityAuditMetadata {
  readonly ipAddress?: string;

  readonly userAgent?: string;

  readonly sessionId?: string;

  readonly [key: string]:
    | string
    | number
    | boolean
    | undefined;
}

export class SecurityAuditService {
  constructor(
    private readonly audit:
      AuditManager,
  ) {}

  async record(
    userId: string | undefined,
    action: SecurityAction,
    metadata?: SecurityAuditMetadata,
  ): Promise<void> {
    await this.audit.record({
      id: crypto.randomUUID(),

      userId,

      action,

      resource: 'identity',

      timestamp: new Date(),

      metadata,
    });
  }
  async getUserEvents(
  userId: string,
): Promise<
  readonly AuditEvent[]
> {
  return this.audit.getUserEvents(
    userId,
  );
}
}