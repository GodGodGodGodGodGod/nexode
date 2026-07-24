import type { DatabaseClient } from '../../client.js';
import type { Repository } from '../../repository.js';
import type { BaseEntity } from '../../types.js';
import type { Transaction } from '../../transaction.js';

import { MemoryRepository } from './memoryRepository.js';

export class MemoryDatabaseClient implements DatabaseClient {
  private readonly repositories = new Map<
    string,
    Repository<BaseEntity>
  >();

  repository<T extends BaseEntity>(
    name: string,
  ): Repository<T> {
    let repository = this.repositories.get(name);

    if (!repository) {
      repository = new MemoryRepository<BaseEntity>();
      this.repositories.set(name, repository);
    }

    return repository as Repository<T>;
  }

  async transaction<T>(
    callback: (tx: Transaction) => Promise<T>,
  ): Promise<T> {
    void callback;
    throw new Error(
      'Transactions are not implemented yet.',
    );
  }

  async connect(): Promise<void> {
    // In-memory database requires no connection.
  }

  async disconnect(): Promise<void> {
    this.repositories.clear();
  }
}