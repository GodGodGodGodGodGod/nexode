import type {
  ProviderType,
} from './providerType.js';

export interface ProviderRequest {

  readonly capability: ProviderType;
}