# @nexode/logger

Shared logging package for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Structured logging
- Log levels
- Log formatting
- Shared logging contracts
- Context-aware logging

## Non-Responsibilities

- Business logic
- Database logging
- HTTP middleware
- Analytics
- Monitoring

## Public API

```ts
import {} from '@nexode/logger';
```

## Allowed Dependencies

- @nexode/types
- @nexode/errors

## Forbidden Dependencies

- React
- NestJS
- Prisma
- Firebase
- Redis
- BullMQ