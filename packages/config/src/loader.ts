import { DEFAULT_CONFIG } from './defaults.js';
import { readEnvironment } from './env.js';
import { configSchema } from './schema.js';
import type { NexodeConfig } from './types.js';
import { ConfigurationValidationError } from './errors.js';

export function loadConfig(): Readonly<NexodeConfig> {
  const env = readEnvironment();

  const config: NexodeConfig = {
    app: {
      name: env.APP_NAME ?? DEFAULT_CONFIG.app.name,
      version: env.APP_VERSION ?? DEFAULT_CONFIG.app.version,
      environment:
        (env.NODE_ENV as NexodeConfig['app']['environment']) ??
        DEFAULT_CONFIG.app.environment,
    },

    server: {
      host: env.SERVER_HOST ?? DEFAULT_CONFIG.server.host,
      port: Number(env.SERVER_PORT ?? DEFAULT_CONFIG.server.port),
    },

    database: {
      url: env.DATABASE_URL ?? DEFAULT_CONFIG.database.url,
    },

    cache: {
      url: env.CACHE_URL ?? DEFAULT_CONFIG.cache.url,
    },

    security: {
      jwtSecret: env.JWT_SECRET ?? DEFAULT_CONFIG.security.jwtSecret,
    },

    logging: {
      level: env.LOG_LEVEL ?? DEFAULT_CONFIG.logging.level,
    },

    firebase: {
      projectId:
        env.FIREBASE_PROJECT_ID ??
        DEFAULT_CONFIG.firebase.projectId,
    },

    storage: {
      provider:
        env.STORAGE_PROVIDER ??
        DEFAULT_CONFIG.storage.provider,
    },

    features: {
      enableSwagger:
        env.ENABLE_SWAGGER === undefined
          ? DEFAULT_CONFIG.features.enableSwagger
          : env.ENABLE_SWAGGER === 'true',
    },
  };

  try {
  const validated = configSchema.parse(config);

  return Object.freeze(validated);
} catch (error) {
  throw new ConfigurationValidationError(
    `Invalid configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
  );
}
}