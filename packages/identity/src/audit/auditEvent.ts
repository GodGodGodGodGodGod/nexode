export interface AuditEvent {
  readonly id: string;

  readonly userId?: string;

  readonly action: string;

  readonly resource: string;

  readonly timestamp: Date;

  readonly metadata?: Record<
    string,
    unknown
  >;
}