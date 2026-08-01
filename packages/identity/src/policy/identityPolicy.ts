import type {
  PolicyName,
} from './policyName.js';

export interface IdentityPolicy<
  TConfiguration = unknown,
> {

  readonly name: PolicyName;

  readonly enabled: boolean;

  readonly configuration?: TConfiguration;
}