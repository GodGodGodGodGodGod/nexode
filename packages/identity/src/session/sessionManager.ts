import type {
  IdentitySession,
} from '../identity/index.js';

import type {
  SessionStore,
} from './sessionStore.js';

import type {
  SessionOptions,
} from './sessionOptions.js';

export class SessionManager {

  constructor(
    private readonly store: SessionStore,
    private readonly options: SessionOptions,
  ) {}

  async create(
    session: IdentitySession,
  ): Promise<void> {

    if (!this.options.allowMultipleSessions) {
      await this.store.deleteByUser(
        session.userId,
      );
    }

    await this.store.create(session);
  }

  async find(
    id: string,
  ) {
    return this.store.find(id);
  }

  async revoke(
    id: string,
  ) {
    return this.store.delete(id);
  }
}