import type { EventHandler } from './types.js';

export interface EventSubscriber {
  subscribe<T>(
    eventName: string,
    handler: EventHandler<T>
  ): void;
}