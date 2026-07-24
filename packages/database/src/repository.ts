import type {
  BaseEntity,
  EntityId,
  FindOptions,
  PaginatedResult,
} from './types.js';

export interface Repository<T extends BaseEntity> {
  create(
    entity: Omit<T, 'createdAt' | 'updatedAt'>,
  ): Promise<T>;

  findById(
    id: EntityId,
  ): Promise<T | null>;

  findOne(
    options: FindOptions<T>,
  ): Promise<T | null>;

  findMany(
    options?: FindOptions<T>,
  ): Promise<PaginatedResult<T>>;

  update(
    id: EntityId,
    updates: Partial<T>,
  ): Promise<T>;

  delete(
    id: EntityId,
  ): Promise<void>;

  exists(
    id: EntityId,
  ): Promise<boolean>;

  count(
    options?: FindOptions<T>,
  ): Promise<number>;
}