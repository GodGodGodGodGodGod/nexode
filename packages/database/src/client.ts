import type { Repository } from './repository.js';
import type { BaseEntity } from './types.js';
import type { Transaction } from './transaction.js';

export interface DatabaseClient {
  repository<T extends BaseEntity>(
    name: string,
  ): Repository<T>;

  transaction<T>(
    callback: (
      tx: Transaction,
    ) => Promise<T>,
  ): Promise<T>;

  connect(): Promise<void>;

  disconnect(): Promise<void>;
}