export interface IdentityEvent {
  readonly type: string;

  readonly occurredAt: Date;

  readonly userId?: string;

  readonly payload?: Record<
    string,
    unknown
  >;
}