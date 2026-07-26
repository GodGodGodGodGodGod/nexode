import type { ServiceFactory } from './factory.types.js';

export interface FactoryDescriptor<T> {
  token: string;
  factory: ServiceFactory<T>;
}

export function createFactory<T>(
  token: string,
  factory: ServiceFactory<T>,
): FactoryDescriptor<T> {
  return {
    token,
    factory,
  };
}