import type { NexodeConfig } from './types.js';

export const DEFAULT_CONFIG: NexodeConfig = {
  app: {
    name: 'NeXoDe',
    version: '0.1.0',
    environment: 'development',
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  database: {
    url: '',
  },

  cache: {
    url: '',
  },

  security: {
    jwtSecret: '',
  },

  logging: {
    level: 'info',
  },

  firebase: {
    projectId: '',
  },

  storage: {
    provider: 'local',
  },

  features: {
    enableSwagger: true,
  },
};