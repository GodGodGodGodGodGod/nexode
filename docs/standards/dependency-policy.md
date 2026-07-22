# NeXoDe Dependency Policy

## Principles

Dependencies must always point downward in the architecture.

Circular dependencies are forbidden.

## Foundation Packages

Foundation packages should have zero or minimal dependencies.

Examples:

- @nexode/types
- @nexode/errors
- @nexode/config

## Runtime Packages

Runtime packages may depend only on lower-level packages.

## Forbidden Dependencies

Shared packages must never depend on:

- Product-specific code
- EpisodeX
- Episode Market
- React (unless intended)
- NestJS (unless intended)
- Prisma (unless intended)
- Firebase (unless intended)

## Adding New Dependencies

Every new dependency should be justified by:

- Clear architectural need
- Long-term maintainability
- Security considerations
- Community support
