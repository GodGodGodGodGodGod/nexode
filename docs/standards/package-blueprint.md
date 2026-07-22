# NeXoDe Package Blueprint

Every package in the NeXoDe monorepo must follow this structure.

```text
package/
├── package.json
├── tsconfig.json
├── README.md
├── CHANGELOG.md
├── LICENSE
├── src/
│   └── index.ts
└── tests/
```

## Required Files

### package.json

Defines package metadata, scripts, exports, and dependencies.

### tsconfig.json

Extends one of the shared TypeScript configurations from `@nexode/tsconfig`.

### README.md

Documents:

- Purpose
- Responsibilities
- Non-responsibilities
- Public API
- Allowed dependencies
- Forbidden dependencies

### CHANGELOG.md

Records all notable changes.

### LICENSE

Defines the package license.

### src/

Contains the implementation.

### tests/

Contains package tests.

## Rules

- Every package must build independently.
- Every package must typecheck independently.
- Every package must have zero TypeScript errors.
- Every package must have clear architectural boundaries.
