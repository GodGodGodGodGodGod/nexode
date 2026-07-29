import type {
  HealthReport,
} from './healthReport.js';

export interface HealthProvider {
  check(): Promise<HealthReport>;
}
