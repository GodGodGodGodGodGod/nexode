import {
  PasswordPolicyEvaluator,
  PolicyName,
} from '@nexode/identity';

export class PasswordPolicyService {
  private readonly evaluator =
    new PasswordPolicyEvaluator();

  async validate(
    password: string,
  ): Promise<void> {
    const result =
      await this.evaluator.evaluate(
        {
          name:
            PolicyName.PASSWORD,

          enabled: true,

          configuration: {
            minimumLength: 8,
            maximumLength: 128,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSymbols: false,
          },
        },
        {
          action:
            'validate-password',

          resource:
            'identity',

          metadata: {
            password,
          },
        },
      );

    if (!result.allowed) {
      throw new Error(
        result.reason ??
        'Password does not meet security requirements.',
      );
    }
  }
}