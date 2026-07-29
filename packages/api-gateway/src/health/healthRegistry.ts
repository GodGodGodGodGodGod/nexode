import type {
  HealthCheck,
} from './healthCheck.js';

export class HealthRegistry {
  private readonly checks: HealthCheck[] = [];

  register(
    check: HealthCheck,
  ): void {
    this.checks.push(check);
  }

  getChecks(): readonly HealthCheck[] {
    return this.checks;
  }
}