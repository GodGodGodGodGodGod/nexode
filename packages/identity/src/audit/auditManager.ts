import type {
  AuditEvent,
} from './auditEvent.js';

import type {
  AuditStore,
} from './auditStore.js';

export class AuditManager {

  constructor(
    private readonly store: AuditStore,
  ) {}

  record(
    event: AuditEvent,
  ): Promise<void> {

    return this.store.save(
      event,
    );
  }

  getUserEvents(
    userId: string,
  ): Promise<
    readonly AuditEvent[]
  > {

    return this.store.findByUserId(
      userId,
    );
  }

  getAllEvents(): Promise<
    readonly AuditEvent[]
  > {

    return this.store.getAll();
  }
}