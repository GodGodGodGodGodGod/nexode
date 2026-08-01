import type {
  ProviderCapability,
} from './providerCapability.js';

import type {
  ProviderHealth,
} from './providerHealth.js';

import type {
  ProviderMetadata,
} from './providerMetadata.js';

import type {
  ProviderPriority,
} from './providerPriority.js';

import type {
  ProviderRegion,
} from './providerRegion.js';

import type {
  ProviderStatus,
} from './providerStatus.js';

import type {
  ProviderType,
} from './providerType.js';

export interface Provider {

  readonly id: string;

  readonly type: ProviderType;

  readonly status: ProviderStatus;

  readonly priority: ProviderPriority;

  readonly metadata: ProviderMetadata;

  readonly health: ProviderHealth;

  readonly capabilities:
    readonly ProviderCapability[];

  readonly regions:
    readonly ProviderRegion[];
}