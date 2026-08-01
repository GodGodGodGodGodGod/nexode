import type {
  AuditEvent,
} from './auditEvent.js';

export interface AuditStore {

  save(
    event: AuditEvent,
  ): Promise<void>;

  findByUserId(
    userId: string,
  ): Promise<
    readonly AuditEvent[]
  >;

  getAll(): Promise<
    readonly AuditEvent[]
  >;
}