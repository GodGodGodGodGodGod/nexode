import type {
  AccountReactivationToken,
} from '../models/accountReactivationToken.js';

import type {
  AccountReactivationRepository,
} from './accountReactivationRepository.js';

export class MemoryAccountReactivationRepository
  implements AccountReactivationRepository {

  private readonly tokens =
    new Map<
      string,
      AccountReactivationToken
    >();

  async create(
    token: AccountReactivationToken,
  ): Promise<void> {
    this.tokens.set(
      token.token,
      token,
    );
  }

  async findByToken(
    token: string,
  ): Promise<
    AccountReactivationToken | undefined
  > {
    return this.tokens.get(
      token,
    );
  }

  async save(
    token: AccountReactivationToken,
  ): Promise<void> {
    this.tokens.set(
      token.token,
      token,
    );
  }
}