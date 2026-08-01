import type {
  IdentityPolicy,
} from '../identityPolicy.js';

import type {
  PolicyContext,
} from '../policyContext.js';

import type {
  PolicyEvaluator,
} from '../policyEvaluator.js';

import type {
  PolicyResult,
} from '../policyResult.js';

import type {
  ApiKeyPolicy,
} from './apiKeyPolicy.js';

export class ApiKeyPolicyEvaluator
  implements PolicyEvaluator<
    ApiKeyPolicy
  > {

  async evaluate(
  policy: IdentityPolicy<ApiKeyPolicy>,
    context: PolicyContext,
  ): Promise<PolicyResult> {

    const configuration =
  policy.configuration;

if (!configuration) {
  return {
    allowed: false,
    reason:
      'API key policy configuration missing',
  };
}

    void configuration;
    void context;

    return {
      allowed: true,
    };
  }
}