export type EntityId = string;

export interface BaseEntity {
  id: EntityId;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  descending?: boolean;
}

export interface FindOptions<T> {
  where?: Partial<T>;
  query?: QueryOptions;
}

export interface DatabaseResult<T> {
  data: T;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}