import type {
  IdentitySession,
  IdentityUser,
} from './types/index.js';

export class IdentityService {

  async getUser(
    id: string,
  ): Promise<IdentityUser | undefined> {

    void id;

    return undefined;
  }

  async getSession(
    id: string,
  ): Promise<IdentitySession | undefined> {

    void id;

    return undefined;
  }
}