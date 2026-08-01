import type {
  Provider,
} from './provider.js';

export interface ProviderResponse {

  readonly provider?: Provider;

  readonly success: boolean;

  readonly reason?: string;
}