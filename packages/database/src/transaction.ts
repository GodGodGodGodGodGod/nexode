import type { Repository } from './repository.js';
import type { BaseEntity } from './types.js';

export interface Transaction {
  repository<T extends BaseEntity>(
    name: string,
  ): Repository<T>;

  commit(): Promise<void>;

  rollback(): Promise<void>;
}