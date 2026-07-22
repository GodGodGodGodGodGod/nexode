# NeXoDe TypeScript Standards

## Compiler Configuration

Every package must extend a shared configuration from `@nexode/tsconfig`.

Available configurations:

- base.json
- node.json
- browser.json
- react.json

## Strict Mode

Strict TypeScript is mandatory.

No package may disable strict mode without an approved Architecture Decision Record (ADR).

## NodeNext

Packages using `NodeNext` must use explicit `.js` extensions in relative imports.

Example:

```ts
import { config } from './config.js';
```

## Build Requirements

Every package must:

- Build independently
- Typecheck independently
- Produce declaration files
- Produce source maps

## Quality Gate

Before merging:

- Zero TypeScript errors
- Zero ESLint errors
- Zero build errors
