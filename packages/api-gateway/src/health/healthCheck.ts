import type {
  HealthStatus,
} from './healthStatus.js';

export interface HealthCheck {
  readonly name: string;

  check(): Promise<HealthStatus>;
}