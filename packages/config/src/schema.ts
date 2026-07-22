import { z } from 'zod';

export const configSchema = z.object({
  app: z.object({
    name: z.string(),
    version: z.string(),
    environment: z.enum([
      'development',
      'test',
      'staging',
      'production',
    ]),
  }),

  server: z.object({
    host: z.string(),
    port: z.number().int().positive(),
  }),

  database: z.object({
    url: z.string(),
  }),

  cache: z.object({
    url: z.string(),
  }),

  security: z.object({
    jwtSecret: z.string(),
  }),

  logging: z.object({
    level: z.string(),
  }),

  firebase: z.object({
    projectId: z.string(),
  }),

  storage: z.object({
    provider: z.string(),
  }),

  features: z.object({
    enableSwagger: z.boolean(),
  }),
});

export type ConfigSchema = z.infer<typeof configSchema>;