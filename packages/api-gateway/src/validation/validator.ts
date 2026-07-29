import type {
  RouteSchema,
} from './types.js';

import {
  ValidationError,
} from './validationError.js';

import type {
  GatewayRequest,
} from '../types/index.js';

export function validateRequest(
  request: GatewayRequest,
  schema?: RouteSchema,
): void {
  if (!schema) {
    return;
  }

  if (schema.params) {
    const result =
      schema.params.safeParse(
        request.params,
      );

    if (!result.success) {
      throw new ValidationError(
        result.error.message,
      );
    }
  }

  if (schema.query) {
    const result =
      schema.query.safeParse(
        request.query,
      );

    if (!result.success) {
      throw new ValidationError(
        result.error.message,
      );
    }
  }

  if (schema.body) {
    const result =
      schema.body.safeParse(
        request.body,
      );

    if (!result.success) {
      throw new ValidationError(
        result.error.message,
      );
    }
  }
}