import type {
  IdentityEvent,
} from './identityEvent.js';

export interface IdentityEventHandler {
  handle(
    event: IdentityEvent,
  ): Promise<void>;
}