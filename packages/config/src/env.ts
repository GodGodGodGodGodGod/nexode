export interface RawEnvironment {
  NODE_ENV?: string;
  APP_NAME?: string;
  APP_VERSION?: string;

  SERVER_HOST?: string;
  SERVER_PORT?: string;

  DATABASE_URL?: string;
  CACHE_URL?: string;

  JWT_SECRET?: string;

  LOG_LEVEL?: string;

  FIREBASE_PROJECT_ID?: string;

  STORAGE_PROVIDER?: string;

  ENABLE_SWAGGER?: string;
}

export function readEnvironment(): RawEnvironment {
  return {
    NODE_ENV: process.env.NODE_ENV,

    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,

    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,

    DATABASE_URL: process.env.DATABASE_URL,
    CACHE_URL: process.env.CACHE_URL,

    JWT_SECRET: process.env.JWT_SECRET,

    LOG_LEVEL: process.env.LOG_LEVEL,

    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,

    STORAGE_PROVIDER: process.env.STORAGE_PROVIDER,

    ENABLE_SWAGGER: process.env.ENABLE_SWAGGER,
  };
}