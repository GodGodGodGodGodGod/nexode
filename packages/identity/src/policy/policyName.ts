export const PolicyName = {

  PASSWORD:
    'password',

  SESSION:
    'session',

  MFA:
    'mfa',

  ACCOUNT_LOCKOUT:
    'account-lockout',

  API_KEY:
    'api-key',

} as const;

export type PolicyName =
  typeof PolicyName[
    keyof typeof PolicyName
  ];