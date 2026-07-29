import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  HealthProvider,
} from './healthProvider.js';

export class HealthController {

  constructor(
    private readonly provider: HealthProvider,
  ) {}

  async health(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {

    void request;

    response.send(
      await this.provider.check(),
    );
  }

  async live(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {

    void request;

    response.send({
      status: 'alive',
    });
  }

  async ready(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {

    void request;

    response.send({
      status: 'ready',
    });
  }
}