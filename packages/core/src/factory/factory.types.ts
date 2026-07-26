import type { ServiceContainer } from '../interfaces.js';

export type ServiceFactory<T> = (
  container: ServiceContainer,
) => T;