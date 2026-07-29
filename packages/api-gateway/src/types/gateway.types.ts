import type {
  AuthUser,
} from '../auth/index.js';

export interface GatewayRequest {
  readonly method: string;

  readonly path: string;

  readonly headers: Record<string, string>;

  readonly requestId?: string;

  readonly correlationId?: string;
  
  readonly params: Record<string, string>;

  readonly query: Record<string, string>;

  readonly body?: unknown;

  readonly user?: AuthUser;
}

export interface GatewayResponse {
  status(code: number): this;
  header(name: string, value: string): this;
  send(body: unknown): void;
}

export type RouteHandler = (
  request: GatewayRequest,
  response: GatewayResponse,
) => void | Promise<void>;