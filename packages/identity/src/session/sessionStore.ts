import type {
  IdentitySession,
} from '../identity/index.js';

export interface SessionStore {
  create(
    session: IdentitySession,
  ): Promise<void>;

  find(
    id: string,
  ): Promise<IdentitySession | undefined>;

  update(
    session: IdentitySession,
  ): Promise<void>;

  delete(
    id: string,
  ): Promise<void>;

  deleteByUser(
    userId: string,
  ): Promise<void>;
}