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
  PasswordPolicy,
} from './passwordPolicy.js';

export class PasswordPolicyEvaluator
  implements PolicyEvaluator<
    PasswordPolicy
  > {

  async evaluate(
  policy: IdentityPolicy<PasswordPolicy>,
  context: PolicyContext,
  ): Promise<PolicyResult> {
    
const configuration =
  policy.configuration;

if (!configuration) {
  return {
    allowed: false,
    reason:
      'Password policy configuration missing',
  };
}
   
  const password =
      context.metadata?.password;

    if (typeof password !== 'string') {
      return {
        allowed: false,
        reason:
          'Password not provided',
      };
    }

    if (
      password.length <
      configuration.minimumLength
    ) {
      return {
        allowed: false,
        reason:
          'Password is too short',
      };
    }

    if (
      configuration.maximumLength !==
        undefined &&
      password.length >
        configuration.maximumLength
    ) {
      return {
        allowed: false,
        reason:
          'Password is too long',
      };
    }

    if (
      configuration.requireUppercase &&
      !/[A-Z]/.test(password)
    ) {
      return {
        allowed: false,
        reason:
          'Missing uppercase letter',
      };
    }

    if (
      configuration.requireLowercase &&
      !/[a-z]/.test(password)
    ) {
      return {
        allowed: false,
        reason:
          'Missing lowercase letter',
      };
    }

    if (
      configuration.requireNumbers &&
      !/[0-9]/.test(password)
    ) {
      return {
        allowed: false,
        reason:
          'Missing number',
      };
    }

    if (
      configuration.requireSymbols &&
      !/[^A-Za-z0-9]/.test(
        password,
      )
    ) {
      return {
        allowed: false,
        reason:
          'Missing symbol',
      };
    }

    return {
      allowed: true,
    };
  }
}