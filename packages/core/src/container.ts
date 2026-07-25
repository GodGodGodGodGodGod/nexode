import type {
  ServiceContainer,
} from './interfaces.js';

let container:
  | ServiceContainer
  | null = null;

export function setContainer(
  value: ServiceContainer,
): void {
  container = value;
}

export function getContainer(): ServiceContainer {
  if (!container) {
    throw new Error(
      'Service container has not been registered.',
    );
  }

  return container;
}