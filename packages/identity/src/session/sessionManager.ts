import type {
  IdentitySession,
} from '../identity/index.js';

import type {
  SessionStore,
} from './sessionStore.js';

import type {
  SessionOptions,
} from './sessionOptions.js';

import type {
  CreateSessionInput,
} from './createSessionInput.js';

export class SessionManager {

  constructor(
    private readonly store: SessionStore,
    private readonly options: SessionOptions,
  ) {}

  async create(
  input: CreateSessionInput,
): Promise<IdentitySession> {

  if (!this.options.allowMultipleSessions) {
    await this.store.deleteByUser(
      input.userId,
    );
  }

  const expiresAt =
    new Date(
      input.createdAt.getTime() +
      this.options.absoluteTimeoutMs,
    );

  const session: IdentitySession = {
    id: input.id,
    userId: input.userId,
    createdAt: input.createdAt,
    expiresAt,
    lastActivityAt: input.createdAt,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  };

  await this.store.create(
    session,
  );

  return session;
}

  async find(
    id: string,
  ) {
    return this.store.find(id);
  }

async findByUser(
  userId: string,
): Promise<
  readonly IdentitySession[]
> {
  return this.store.findByUser(
    userId,
  );
}

  async validate(
    id: string,
  ): Promise<
    IdentitySession | undefined
  > {
    const session =
      await this.store.find(id);

    if (!session) {
      return undefined;
    }

    const now =
      new Date();

    const absoluteExpired =
      now.getTime() >=
      session.expiresAt.getTime();

    if (absoluteExpired) {
      await this.store.delete(
        session.id,
      );

      return undefined;
    }

    const idleExpired =
      now.getTime() -
      session.lastActivityAt.getTime() >=
      this.options.idleTimeoutMs;

    if (idleExpired) {
      await this.store.delete(
        session.id,
      );

      return undefined;
    }

    const updatedSession: IdentitySession = {
      ...session,
      lastActivityAt: now,
    };

    await this.store.update(
      updatedSession,
    );

    return updatedSession;
  }

  async revoke(
    id: string,
  ) {
    return this.store.delete(id);
  }

  async revokeAllForUser(
    userId: string,
  ): Promise<void> {
    await this.store.deleteByUser(
      userId,
    );
  }
}