import type {
  CorsOptions,
} from './corsOptions.js';

export interface SecurityConfig {
  readonly cors?: CorsOptions;

  readonly maxBodySize?: number;

  readonly trustProxy?: boolean;
}