import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

export interface HttpAdapter {
  listen(port: number): Promise<void>;

  close(): Promise<void>;

  onRequest(
    handler: (
      request: GatewayRequest,
      response: GatewayResponse,
    ) => Promise<void>,
  ): void;
}