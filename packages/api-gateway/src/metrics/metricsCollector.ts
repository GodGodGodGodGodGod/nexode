export interface MetricsCollector {
  increment(
    name: string,
    value?: number,
  ): void;

  gauge(
    name: string,
    value: number,
  ): void;

  timing(
    name: string,
    milliseconds: number,
  ): void;
}