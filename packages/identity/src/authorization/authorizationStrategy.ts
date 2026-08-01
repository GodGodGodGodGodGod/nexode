export const AuthorizationStrategy = {

  RBAC:
    'rbac',

  ABAC:
    'abac',

  REBAC:
    'rebac',

  ORGANIZATION:
    'organization',

  CUSTOM:
    'custom',

} as const;

export type AuthorizationStrategy =
  typeof AuthorizationStrategy[
    keyof typeof AuthorizationStrategy
  ];