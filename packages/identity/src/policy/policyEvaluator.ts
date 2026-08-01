import type {
  IdentityPolicy,
} from './identityPolicy.js';

import type {
  PolicyContext,
} from './policyContext.js';

import type {
  PolicyResult,
} from './policyResult.js';

export interface PolicyEvaluator<

  TConfiguration = unknown,

> {
  evaluate(
    policy: IdentityPolicy<TConfiguration>,
    context: PolicyContext,
  ): Promise<PolicyResult>;
}