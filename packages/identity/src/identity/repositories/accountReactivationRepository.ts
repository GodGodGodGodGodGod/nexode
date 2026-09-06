import type {
  AccountReactivationToken,
} from '../models/accountReactivationToken.js';

export interface AccountReactivationRepository {
  create(
    token: AccountReactivationToken,
  ): Promise<void>;

  findByToken(
    token: string,
  ): Promise<
    AccountReactivationToken | undefined
  >;

  save(
    token: AccountReactivationToken,
  ): Promise<void>;
}