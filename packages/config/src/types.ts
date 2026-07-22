export type Environment =
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export interface AppConfig {
  name: string;
  version: string;
  environment: Environment;
}

export interface ServerConfig {
  host: string;
  port: number;
}

export interface DatabaseConfig {
  url: string;
}

export interface CacheConfig {
  url: string;
}

export interface SecurityConfig {
  jwtSecret: string;
}

export interface LoggingConfig {
  level: string;
}

export interface FirebaseConfig {
  projectId: string;
}

export interface StorageConfig {
  provider: string;
}

export interface FeatureConfig {
  enableSwagger: boolean;
}

export interface NexodeConfig {
  app: AppConfig;
  server: ServerConfig;
  database: DatabaseConfig;
  cache: CacheConfig;
  security: SecurityConfig;
  logging: LoggingConfig;
  firebase: FirebaseConfig;
  storage: StorageConfig;
  features: FeatureConfig;
}