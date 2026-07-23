import type { EventBus } from './bus.js';
import { InMemoryEventBus } from './bus.js';

let currentBus: EventBus = new InMemoryEventBus();

export function getEventBus(): EventBus {
  return currentBus;
}

export function setEventBus(bus: EventBus): void {
  currentBus = bus;
}