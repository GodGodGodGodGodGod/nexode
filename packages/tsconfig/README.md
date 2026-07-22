# @nexode/tsconfig

Shared TypeScript configurations for the NeXoDe platform.

## Classification

Foundation Package

## Responsibilities

- Shared compiler options
- Common TypeScript standards
- Runtime-specific configurations
- Monorepo consistency

## Non-Responsibilities

- Runtime code
- Business logic
- Utility functions
- Build scripts

## Available Configurations

### base.json

Common compiler settings for all packages.

### node.json

Configuration for Node.js packages and backend services.

### browser.json

Configuration for browser-based packages.

### react.json

Configuration for React and Next.js applications.

## Allowed Dependencies

None

## Forbidden Dependencies

- React
- NestJS
- Prisma
- Firebase
- Redis
- BullMQ
- Any runtime library
