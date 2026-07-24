import type { DatabaseClient } from './client.js';

export interface DatabaseProvider {
  createClient(): DatabaseClient;
}

export interface ConnectionOptions {
  connectionString?: string;
  database?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}