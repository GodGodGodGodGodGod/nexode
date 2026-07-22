import type { AppConfig, Environment } from './types.js';

const environment = (process.env.NODE_ENV ?? 'development') as Environment;

export const config: AppConfig = {
  environment,
  isDevelopment: environment === 'development',
  isTest: environment === 'test',
  isStaging: environment === 'staging',
  isProduction: environment === 'production',
};

export function getConfig(): AppConfig {
  return config;
}
