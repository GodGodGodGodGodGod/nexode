# @nexode/errors

Shared error system for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Base error classes
- Error codes
- Error metadata
- Shared error contracts
- Type-safe errors

## Non-Responsibilities

- HTTP responses
- NestJS exceptions
- Express middleware
- Logging
- Business logic

## Public API

```ts
import {} from '@nexode/errors';
```

## Allowed Dependencies

- @nexode/types

## Forbidden Dependencies

- Node.js APIs
- Browser APIs
- React
- NestJS
- Express
- Prisma
- Firebase
- Redis
- BullMQ

## Folder Structure

```text
src/
└── index.ts
```
