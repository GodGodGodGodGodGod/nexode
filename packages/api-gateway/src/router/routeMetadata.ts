export interface RouteMetadata {
  summary?: string;

  description?: string;

  tags?: readonly string[];

  operationId?: string;

  deprecated?: boolean;

  authentication?: boolean;

  permissions?: readonly string[];

  version?: string;
}