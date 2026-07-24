import type {
  Repository,
} from '../../repository.js';

import type {
  BaseEntity,
  EntityId,
  FindOptions,
  PaginatedResult,
} from '../../types.js';

export class MemoryRepository<T extends BaseEntity>
  implements Repository<T>
{
  private readonly items = new Map<EntityId, T>();

  async create(
    entity: Omit<T, 'createdAt' | 'updatedAt'>,
  ): Promise<T> {
    const now = new Date();

    const created = {
      ...entity,
      createdAt: now,
      updatedAt: now,
    } as T;

    this.items.set(created.id, created);

    return created;
  }

  async findById(
    id: EntityId,
  ): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

async findOne(
  options: FindOptions<T>,
): Promise<T | null> {
  void options;
  throw new Error('Not implemented yet.');
}

  async findMany(
  options?: FindOptions<T>,
): Promise<PaginatedResult<T>> {
  void options;

  const values = [...this.items.values()];

  return {
    items: values,
    total: values.length,
    limit: values.length,
    offset: 0,
  };
}

  async update(
    id: EntityId,
    updates: Partial<T>,
  ): Promise<T> {
    const entity = this.items.get(id);

    if (!entity) {
      throw new Error('Entity not found.');
    }

    const updated = {
      ...entity,
      ...updates,
      updatedAt: new Date(),
    };

    this.items.set(id, updated);

    return updated;
  }

  async delete(
    id: EntityId,
  ): Promise<void> {
    this.items.delete(id);
  }

  async exists(
    id: EntityId,
  ): Promise<boolean> {
    return this.items.has(id);
  }

  async count(): Promise<number> {
    return this.items.size;
  }
}