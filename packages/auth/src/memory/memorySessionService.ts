import type {
  Session,
  UserIdentity,
} from '../types.js';

import type {
  SessionService,
} from '../interfaces.js';

export class MemorySessionService implements SessionService {
  private readonly sessions = new Map<string, Session>();

  async create(user: UserIdentity): Promise<Session> {
    const now = new Date();

    const session: Session = {
      id: crypto.randomUUID(),
      user,
      accessToken: {
        token: '',
        expiresAt: now,
      },
      createdAt: now,
      expiresAt: now,
    };

    this.sessions.set(session.id, session);

    return session;
  }

  async get(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }

  async destroy(id: string): Promise<void> {
    this.sessions.delete(id);
  }
}