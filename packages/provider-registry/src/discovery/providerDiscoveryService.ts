import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

import type {
  ProviderRegistry,
} from '../registry/providerRegistry.js';

import type {
  ProviderDiscovery,
} from './providerDiscovery.js';

export class ProviderDiscoveryService
  implements ProviderDiscovery {

  constructor(
    private readonly registry: ProviderRegistry,
  ) {}

  findByType(
    type: ProviderType,
  ): readonly Provider[] {

    return this.registry.findByType(
      type,
    );
  }

  findByCapability(
    capability: string,
  ): readonly Provider[] {

    return this.registry
      .list()
      .filter(
        provider =>
          provider.capabilities.some(
            value =>
              value.name === capability,
          ),
      );
  }
}