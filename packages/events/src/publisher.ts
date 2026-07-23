import type { BaseEvent } from './types.js';

export interface EventPublisher {
  publish<T>(event: BaseEvent<T>): Promise<void>;
}