export interface GatewayConfig {
  readonly serviceName: string;

  readonly version: string;

  readonly port: number;

  readonly environment: string;
}