import type {
  IdentityEvent,
} from './identityEvent.js';

import type {
  IdentityEventHandler,
} from './identityEventHandler.js';

export class IdentityEventDispatcher {

  constructor(
    private readonly handlers:
      readonly IdentityEventHandler[],
  ) {}

  async dispatch(
    event: IdentityEvent,
  ): Promise<void> {

    for (const handler of this.handlers) {
      await handler.handle(
        event,
      );
    }
  }
}