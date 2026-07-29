import type { ApplicationContext } from '../context/index.js';

export class Runtime {
  constructor(
    public readonly context: ApplicationContext,
  ) {}
}