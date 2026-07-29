import type {
  MetricsCollector,
} from './metricsCollector.js';

export class InMemoryMetricsCollector
  implements MetricsCollector {

  private readonly metrics =
    new Map<string, number>();

  increment(
    name: string,
    value = 1,
  ): void {
    this.metrics.set(
      name,
      (this.metrics.get(name) ?? 0) +
        value,
    );
  }

  gauge(
    name: string,
    value: number,
  ): void {
    this.metrics.set(
      name,
      value,
    );
  }

  timing(
    name: string,
    milliseconds: number,
  ): void {
    this.metrics.set(
      name,
      milliseconds,
    );
  }

  snapshot(): ReadonlyMap<
    string,
    number
  > {
    return this.metrics;
  }
}