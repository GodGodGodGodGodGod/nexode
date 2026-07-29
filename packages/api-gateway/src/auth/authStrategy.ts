import type {
  GatewayRequest,
} from '../types/index.js';

import type {
  AuthenticationResult,
} from './types.js';

export interface AuthStrategy {
  authenticate(
    request: GatewayRequest,
  ): Promise<AuthenticationResult>;
}