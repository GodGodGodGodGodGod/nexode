import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

export interface ProviderDiscovery {

  findByType(
    type: ProviderType,
  ): readonly Provider[];

  findByCapability(
    capability: string,
  ): readonly Provider[];
}