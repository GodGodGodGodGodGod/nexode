import type { ApplicationContext } from '@nexode/core';

export class Runtime {
  constructor(
    public readonly context: ApplicationContext,
  ) {}
}