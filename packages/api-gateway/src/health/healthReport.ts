import type {
  HealthStatus,
} from './healthStatus.js';

export interface HealthReport {
  readonly status: HealthStatus;

  readonly timestamp: Date;

  readonly service: string;

  readonly version: string;

  readonly uptime: number;

  readonly checks?: Record<
  string,
  string
>;
}