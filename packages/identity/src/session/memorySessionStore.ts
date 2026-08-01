import type {
  IdentitySession,
} from '../identity/index.js';

import type {
  SessionStore,
} from './sessionStore.js';

export class MemorySessionStore
  implements SessionStore {

  private readonly sessions =
    new Map<string, IdentitySession>();

  async create(
    session: IdentitySession,
  ): Promise<void> {

    this.sessions.set(
      session.id,
      session,
    );
  }

  async find(
    id: string,
  ): Promise<IdentitySession | undefined> {

    return this.sessions.get(id);
  }

  async update(
    session: IdentitySession,
  ): Promise<void> {

    this.sessions.set(
      session.id,
      session,
    );
  }

  async delete(
    id: string,
  ): Promise<void> {

    this.sessions.delete(id);
  }

  async deleteByUser(
    userId: string,
  ): Promise<void> {

    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        this.sessions.delete(session.id);
      }
    }
  }
}