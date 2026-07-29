import type {
  ZodSchema,
} from 'zod';

export interface RouteSchema {
  readonly params?: ZodSchema;

  readonly query?: ZodSchema;

  readonly body?: ZodSchema;

  readonly response?: ZodSchema;
}