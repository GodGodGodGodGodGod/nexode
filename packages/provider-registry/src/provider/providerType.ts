export const ProviderType = {

  PAYMENT: 'payment',

  STORAGE: 'storage',

  EMAIL: 'email',

  SMS: 'sms',

  PUSH: 'push',

  AI: 'ai',

  ANALYTICS: 'analytics',

  AUTHENTICATION: 'authentication',

} as const;

export type ProviderType =
  typeof ProviderType[
    keyof typeof ProviderType
  ];