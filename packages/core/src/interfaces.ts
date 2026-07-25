import type {
  ServiceDescriptor,
} from './types.js';

export interface ServiceContainer {
  register<T>(
    descriptor: ServiceDescriptor<T>,
  ): void;

  resolve<T>(
    token: string,
  ): T;
}