import type {
  GatewayConfig,
} from './gatewayConfig.js';

export const defaultGatewayConfig: GatewayConfig = {
  serviceName:
    'api-gateway',

  version:
    '0.1.0',

  port:
    3000,

  environment:
    'development',
};