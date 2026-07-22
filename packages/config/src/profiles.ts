import type { Environment } from './types.js';

export const ENVIRONMENTS: readonly Environment[] = [
  'development',
  'test',
  'staging',
  'production',
] as const;

export const DEFAULT_ENVIRONMENT: Environment = 'development';

export function isProduction(environment: Environment): boolean {
  return environment === 'production';
}

export function isDevelopment(environment: Environment): boolean {
  return environment === 'development';
}

export function isTest(environment: Environment): boolean {
  return environment === 'test';
}

export function isStaging(environment: Environment): boolean {
  return environment === 'staging';
}