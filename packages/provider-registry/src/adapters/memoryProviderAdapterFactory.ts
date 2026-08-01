import type {
  ProviderAdapter,
} from './providerAdapter.js';

import type {
  ProviderAdapterFactory,
} from './providerAdapterFactory.js';

export class MemoryProviderAdapterFactory
  implements ProviderAdapterFactory {

  private readonly adapters =
    new Map<
      string,
      ProviderAdapter
    >();

  register(
    adapter: ProviderAdapter,
  ): void {

    this.adapters.set(
      adapter.provider.id,
      adapter,
    );

  }

  get(
    providerId: string,
  ): ProviderAdapter | undefined {

    return this.adapters.get(
      providerId,
    );

  }

  list(): readonly ProviderAdapter[] {

    return [
      ...this.adapters.values(),
    ];

  }

}