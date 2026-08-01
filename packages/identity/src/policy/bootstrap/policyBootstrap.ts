import {
  PolicyName,
} from '../policyName.js';

import type {
  PolicyRegistry,
} from '../registry/policyRegistry.js';

import {
  PasswordPolicyEvaluator,
} from '../password/index.js';

import {
  SessionPolicyEvaluator,
} from '../session/index.js';

import {
  MfaPolicyEvaluator,
} from '../mfa/index.js';

import {
  AccountLockoutPolicyEvaluator,
} from '../account-lockout/index.js';

import {
  ApiKeyPolicyEvaluator,
} from '../api-key/index.js';

export class PolicyBootstrap {

  constructor(
    private readonly registry: PolicyRegistry,
  ) {}

  registerDefaults(): void {

    this.registry.register(
      PolicyName.PASSWORD,
      new PasswordPolicyEvaluator(),
    );

    this.registry.register(
      PolicyName.SESSION,
      new SessionPolicyEvaluator(),
    );

    this.registry.register(
      PolicyName.MFA,
      new MfaPolicyEvaluator(),
    );

    this.registry.register(
      PolicyName.ACCOUNT_LOCKOUT,
      new AccountLockoutPolicyEvaluator(),
    );

    this.registry.register(
      PolicyName.API_KEY,
      new ApiKeyPolicyEvaluator(),
    );
  }
}