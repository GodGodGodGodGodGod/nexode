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
  MfaPolicy,
} from './mfaPolicy.js';

export class MfaPolicyEvaluator
  implements PolicyEvaluator<
    MfaPolicy
  > {

  async evaluate(
    policy: IdentityPolicy<MfaPolicy>,
    context: PolicyContext,
  ): Promise<PolicyResult> {

const configuration =
  policy.configuration;

if (!configuration) {
  return {
    allowed: false,
    reason:
      'MFA policy configuration missing',
  };
}
  

    void context;

    if (configuration.required) {
      return {
        allowed: false,
        reason: 'Multi-factor authentication required',
      };
    }

    return {
      allowed: true,
    };
  }
}