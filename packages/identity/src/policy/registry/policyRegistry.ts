import type {
  PolicyEvaluator,
} from '../policyEvaluator.js';
import type {
  PolicyName,
} from '../policyName.js';

export interface PolicyRegistry {

  register(
  name: PolicyName,
    evaluator: PolicyEvaluator,
  ): void;

  find(
    name: PolicyName,
  ): PolicyEvaluator | undefined;

  list(): readonly PolicyName[];
}