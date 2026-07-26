import type {
  FactoryDescriptor,
} from './factory/index.js';

import type {
  ServiceDescriptor,
} from './types.js';

export interface ServiceContainer {
  register<T>(
    descriptor: ServiceDescriptor<T>,
  ): void;

  registerFactory<T>(
    descriptor: FactoryDescriptor<T>,
  ): void;

  resolve<T>(
    token: string,
  ): T;
}