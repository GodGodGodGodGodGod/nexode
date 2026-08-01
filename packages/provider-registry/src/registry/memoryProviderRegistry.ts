import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

import type {
  ProviderRegistry,
} from './providerRegistry.js';

export class MemoryProviderRegistry
  implements ProviderRegistry {

  private readonly providers =
    new Map<
      string,
      Provider
    >();

  register(
    provider: Provider,
  ): void {

    this.providers.set(
      provider.id,
      provider,
    );
  }

  unregister(
    providerId: string,
  ): void {

    this.providers.delete(
      providerId,
    );
  }

  findById(
    providerId: string,
  ): Provider | undefined {

    return this.providers.get(
      providerId,
    );
  }

  findByType(
    type: ProviderType,
  ): readonly Provider[] {

    return [
      ...this.providers.values(),
    ].filter(
      provider =>
        provider.type === type,
    );
  }

  list(): readonly Provider[] {

    return [
      ...this.providers.values(),
    ];
  }
}