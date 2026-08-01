import type {
  IdentityPolicy,
} from './identityPolicy.js';

import type {
  PolicyContext,
} from './policyContext.js';

import type {
  PolicyResult,
} from './policyResult.js';

import type {
  PolicyRegistry,
} from './registry/policyRegistry.js';

export class PolicyEngine {

  constructor(
    private readonly registry: PolicyRegistry,
  ) {}

  async evaluate(
    policy: IdentityPolicy,
    context: PolicyContext,
  ): Promise<PolicyResult> {

    const evaluator =
      this.registry.find(
        policy.name,
      );

    if (!evaluator) {
      return {
        allowed: false,
        reason:
          `No evaluator registered for policy "${policy.name}"`,
      };
    }

    return evaluator.evaluate(
      policy,
      context,
    );
  }
}