export { config, getConfig } from './config.js';

export type {
  Environment,
  NexodeConfig,
} from './types.js';

export {
  isDevelopment,
  isProduction,
  isStaging,
  isTest,
} from './profiles.js';

export {
  ConfigurationError,
  ConfigurationValidationError,
} from './errors.js';