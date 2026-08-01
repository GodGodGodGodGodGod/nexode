export const ProviderStatus = {

  ACTIVE: 'active',

  INACTIVE: 'inactive',

  MAINTENANCE: 'maintenance',

  DISABLED: 'disabled',

} as const;

export type ProviderStatus =
  typeof ProviderStatus[
    keyof typeof ProviderStatus
  ];