import {
  HealthStatus,
} from './healthStatus.js';

import type {
  HealthProvider,
} from './healthProvider.js';

import type {
  HealthReport,
} from './healthReport.js';
import {
  HealthRegistry,
} from './healthRegistry.js';

export class DefaultHealthProvider
  implements HealthProvider {

  constructor(
  private readonly service: string,

  private readonly version: string,

  private readonly registry?: HealthRegistry,
) {}

  async check(): Promise<HealthReport> {

  const checks: Record<
    string,
    string
  > = {};

  if (this.registry) {
    for (const check of this.registry.getChecks()) {
      checks[
        check.name
      ] = await check.check();
    }
  }

  return {
    status: HealthStatus.HEALTHY,

    timestamp: new Date(),

    service: this.service,

    version: this.version,

    uptime: process.uptime(),

    checks,
  };
}
}