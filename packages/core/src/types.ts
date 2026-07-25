export type ServiceLifetime =
  | 'singleton'
  | 'transient'
  | 'scoped';

export interface ServiceDescriptor<T = unknown> {
  token: string;
  implementation: T;
  lifetime: ServiceLifetime;
}