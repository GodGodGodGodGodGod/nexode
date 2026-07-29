import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

export type NextFunction = () => void | Promise<void>;

export interface Middleware {
  handle(
    request: GatewayRequest,
    response: GatewayResponse,
    next: NextFunction,
  ): void | Promise<void>;
}