import type {
  Provider,
} from '../provider/provider.js';

import type {
  ProviderFailoverStrategy,
} from './providerFailoverStrategy.js';

export class PriorityFailoverStrategy
  implements ProviderFailoverStrategy {

  order(
    providers: readonly Provider[],
  ): readonly Provider[] {

    return [...providers].sort(
      (left, right) =>
        left.priority -
        right.priority,
    );

  }

}