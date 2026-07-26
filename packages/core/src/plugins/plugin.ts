import type {
  ServiceContainer,
} from '../interfaces.js';

export interface CorePlugin {
  readonly name: string;

  register(
    container: ServiceContainer,
  ): Promise<void> | void;
}