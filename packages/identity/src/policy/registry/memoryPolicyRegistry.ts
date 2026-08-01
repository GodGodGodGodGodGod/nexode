import type {
  PolicyEvaluator,
} from '../policyEvaluator.js';

import type {
  PolicyRegistry,
} from './policyRegistry.js';

import type {
  PolicyName,
} from '../policyName.js';

export class MemoryPolicyRegistry
  implements PolicyRegistry {

  private readonly evaluators =
    new Map<
     PolicyName,
      PolicyEvaluator
    >();

  register(
    name: PolicyName,
    evaluator: PolicyEvaluator,
  ): void {

    this.evaluators.set(
      name,
      evaluator,
    );
  }

  find(
    name: PolicyName,
  ): PolicyEvaluator | undefined {

    return this.evaluators.get(
      name,
    );
  }

  list(): readonly PolicyName[] {

    return [
      ...this.evaluators.keys(),
    ];
  }
}