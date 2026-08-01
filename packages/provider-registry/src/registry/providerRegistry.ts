import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

export interface ProviderRegistry {

  register(
    provider: Provider,
  ): void;

  unregister(
    providerId: string,
  ): void;

  findById(
    providerId: string,
  ): Provider | undefined;

  findByType(
    type: ProviderType,
  ): readonly Provider[];

  list(): readonly Provider[];
}