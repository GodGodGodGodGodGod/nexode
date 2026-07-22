export type Environment = 'development' | 'test' | 'staging' | 'production';

export interface AppConfig {
  readonly environment: Environment;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
  readonly isStaging: boolean;
  readonly isProduction: boolean;
}
