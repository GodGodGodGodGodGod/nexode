import type {
  ServiceContainer,
} from './interfaces.js';


let container:
  ServiceContainer | undefined;


export function setContainer(
  value: ServiceContainer,
): void {
  container = value;
}


export function getContainer():
ServiceContainer {

  if (!container) {
    throw new Error(
      'Container not initialized',
    );
  }

  return container;
}


export function resolve<T>(
  token: string,
): T {

  return getContainer()
    .resolve<T>(token);
}