import {
  ContainerError,
} from '../../errors.js';

import type {
  ServiceContainer,
} from '../../interfaces.js';

import type {
  ServiceDescriptor,
} from '../../types.js';


export class DefaultContainer
  implements ServiceContainer
{
  private readonly services =
    new Map<string, ServiceDescriptor>();

  private readonly instances =
    new Map<string, unknown>();


  register<T>(
    descriptor: ServiceDescriptor<T>,
  ): void {
    this.services.set(
      descriptor.token,
      descriptor,
    );
  }


  resolve<T>(
    token: string,
  ): T {

    const service =
      this.services.get(token);


    if (!service) {
      throw new ContainerError(
        `Service not registered: ${token}`,
      );
    }


    if (
      service.lifetime === 'singleton'
      &&
      this.instances.has(token)
    ) {
      return this.instances.get(
        token,
      ) as T;
    }


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
}