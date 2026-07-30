import type {
  IdentitySession,
} from '../models/identitySession.js';

export interface SessionRepository {
  findById(
    id: string,
  ): Promise<IdentitySession | undefined>;

  save(
    session: IdentitySession,
  ): Promise<void>;

  delete(
    id: string,
  ): Promise<void>;
}