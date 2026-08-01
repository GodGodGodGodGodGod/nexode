import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderType,
} from '../provider/providerType.js';

export interface ProviderRouter {

  select(
    type: ProviderType,
  ): Provider | undefined;

}