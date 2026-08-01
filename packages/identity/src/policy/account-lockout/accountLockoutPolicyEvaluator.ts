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
  AccountLockoutPolicy,
} from './accountLockoutPolicy.js';

export class AccountLockoutPolicyEvaluator
  implements PolicyEvaluator<
    AccountLockoutPolicy
  > {

  async evaluate(
    policy: IdentityPolicy<AccountLockoutPolicy>,
    context: PolicyContext,
  ): Promise<PolicyResult> {

  const configuration =
  policy.configuration;

if (!configuration) {
  return {
    allowed: false,
    reason:
      'Account lockout policy configuration missing',
  };
}

    const failedAttempts =
      Number(
        context.metadata
          ?.failedAttempts ?? 0,
      );

    if (
      failedAttempts >=
      configuration.maximumFailedAttempts
    ) {
      return {
        allowed: false,
        reason:
          'Account temporarily locked',
      };
    }

    return {
      allowed: true,
    };
  }
}