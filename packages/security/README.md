# @nexode/security

Shared security contracts for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Authentication contracts
- Authorization contracts
- Permission contracts
- Role contracts
- Shared security types

## Non-Responsibilities

- Authentication providers
- JWT implementation
- OAuth
- Password hashing
- Session management
- Business permissions

## Public API

```ts
import {} from '@nexode/security';
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