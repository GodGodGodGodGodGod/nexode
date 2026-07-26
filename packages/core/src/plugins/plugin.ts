import type {
  ServiceContainer,
} from '../interfaces.js';

export interface CorePlugin {
  name: string;

  register(
    container: ServiceContainer,
  ): void;
}