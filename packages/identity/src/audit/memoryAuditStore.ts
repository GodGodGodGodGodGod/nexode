import type {
  AuditEvent,
} from './auditEvent.js';

import type {
  AuditStore,
} from './auditStore.js';

export class MemoryAuditStore
  implements AuditStore {

  private readonly events:
    AuditEvent[] = [];

  async save(
    event: AuditEvent,
  ): Promise<void> {

    this.events.push(event);
  }

  async findByUserId(
    userId: string,
  ): Promise<
    readonly AuditEvent[]
  > {

    return this.events.filter(
      event =>
        event.userId === userId,
    );
  }

  async getAll(): Promise<
    readonly AuditEvent[]
  > {

    return this.events;
  }
}