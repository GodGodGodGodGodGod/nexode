import type {
  ProviderAdapter,
} from './providerAdapter.js';

export interface ProviderAdapterFactory {

  register(
    adapter: ProviderAdapter,
  ): void;

  get(
    providerId: string,
  ): ProviderAdapter | undefined;

  list(): readonly ProviderAdapter[];

}