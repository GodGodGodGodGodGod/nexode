import {
  RuntimeBuilder,
} from './runtime/index.js';

import {
  setContainer,
} from './container.js';

import {
  setContext,
} from './context.js';

export async function bootstrap() {

  const runtime =
    await new RuntimeBuilder()
      .build();

  setContainer(
    runtime.context.container,
  );

  setContext(
    runtime.context,
  );

  await runtime.context.plugins.load(
    runtime.context.container,
  );

  await runtime.context.lifecycle.start();
}