import type {
  Provider,
} from '../provider/provider.js';

export interface ProviderAdapter {

  readonly provider: Provider;

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  healthCheck(): Promise<boolean>;

}