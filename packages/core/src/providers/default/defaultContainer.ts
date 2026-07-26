import { ContainerError } from '../../errors.js';

import type { ServiceContainer } from '../../interfaces.js';
import type { ServiceDescriptor } from '../../types.js';

import type {
  FactoryDescriptor,
} from '../../factory/index.js';

export class DefaultContainer
  implements ServiceContainer
{
  private readonly services =
    new Map<string, ServiceDescriptor<unknown>>();

  private readonly instances =
    new Map<string, unknown>();

  private readonly factories =
    new Map<string, FactoryDescriptor<unknown>>();

  register<T>(
    descriptor: ServiceDescriptor<T>,
  ): void {
    this.services.set(
      descriptor.token,
      descriptor,
    );
  }

  registerFactory<T>(
    descriptor: FactoryDescriptor<T>,
  ): void {
    this.factories.set(
      descriptor.token,
      descriptor,
    );
  }

  resolve<T>(
    token: string,
  ): T {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    const service =
      this.services.get(token);

    if (service) {
      const instance =
        service.implementation;

      if (
        service.lifetime === 'singleton'
      ) {
        this.instances.set(
          token,
          instance,
        );
      }

      return instance as T;
    }

    const factory =
      this.factories.get(token);

    if (factory) {
      const instance =
        factory.factory(this);

      this.instances.set(
        token,
        instance,
      );

      return instance as T;
    }

    throw new ContainerError(
      `Service not registered: ${token}`,
    );
  }
}