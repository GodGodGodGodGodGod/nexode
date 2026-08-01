import type {
  PolicyEvaluator,
} from '../policyEvaluator.js';

import type {
  IdentityPolicy,
} from '../identityPolicy.js';

import type {
  PolicyContext,
} from '../policyContext.js';

import type {
  PolicyResult,
} from '../policyResult.js';

import type {
  SessionPolicy,
} from './sessionPolicy.js';

export class SessionPolicyEvaluator
  implements PolicyEvaluator<
    SessionPolicy
  > {

  async evaluate(
    policy: IdentityPolicy<SessionPolicy>,
    context: PolicyContext,
  ): Promise<PolicyResult> {

  const configuration =
  policy.configuration;

if (!configuration) {
  return {
    allowed: false,
    reason:
      'Session policy configuration missing',
  };
}

    void configuration;
    void context;

    return {
      allowed: true,
    };
  }
}