import type {
  Provider,
} from '../provider/provider.js';

export interface ProviderFailoverStrategy {

  order(
    providers: readonly Provider[],
  ): readonly Provider[];

}