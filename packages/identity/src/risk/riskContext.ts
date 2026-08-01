export interface RiskContext {
  readonly userId: string;

  readonly ipAddress?: string;

  readonly deviceId?: string;

  readonly userAgent?: string;
}