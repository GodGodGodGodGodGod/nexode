import type { BaseEvent, EventHandler } from './types.js';

export interface EventBus {
  publish<T>(event: BaseEvent<T>): Promise<void>;
  subscribe<T>(
    eventName: string,
    handler: EventHandler<T>
  ): void;
}

export class InMemoryEventBus implements EventBus {
  private readonly handlers = new Map<
    string,
    EventHandler[]
  >();

  async publish<T>(event: BaseEvent<T>): Promise<void> {
    const handlers =
      this.handlers.get(event.name) ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }

  subscribe<T>(
    eventName: string,
    handler: EventHandler<T>
  ): void {
    const handlers =
      this.handlers.get(eventName) ?? [];

    handlers.push(handler as EventHandler);

    this.handlers.set(eventName, handlers);
  }
}