# @nexode/config

Shared configuration package for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Typed configuration
- Environment loading
- Environment validation
- Shared configuration interfaces

## Non-Responsibilities

- Database connections
- Firebase initialization
- Redis initialization
- Business logic
- Service-specific configuration

## Public API

```ts
import { config, getConfig, type AppConfig, type Environment } from '@nexode/config';
```

## Allowed Dependencies

- dotenv
- zod

## Forbidden Dependencies

- Firebase SDK
- Prisma
- Redis
- NestJS
- Express
- BullMQ
- Product-specific packages

## Folder Structure

```text
src/
├── index.ts
├── types.ts
├── env.ts
└── config.ts
```
