# @nexode/database

Shared database abstractions for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Database contracts
- Repository abstractions
- Transaction abstractions
- Shared database configuration
- Future Prisma integration

## Non-Responsibilities

- Business entities
- Authentication data
- User models
- Migrations
- Seed data

## Public API

```ts
import {} from '@nexode/database';
```

## Allowed Dependencies

- @nexode/types
- @nexode/errors
- @nexode/config

## Forbidden Dependencies

- React
- NestJS
- Firebase
- BullMQ
- Redis