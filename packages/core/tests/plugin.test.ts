import {
  DefaultContainer,
} from '../src/providers/default/index.js';

import {
  PluginManager,
} from '../src/index.js';

const manager =
  new PluginManager();

manager.register({
  name: 'demo',

  register(
    container,
  ) {
    container.register({
      token: 'demo',

      implementation: {
        ok: true,
      },

      lifetime:
        'singleton',
    });
  },
});

async function main() {
  const container =
    new DefaultContainer();

  await manager.load(
    container,
  );

  console.log(
    container.resolve('demo'),
  );

  console.log(
    'Plugin OK',
  );
}

main().catch(console.error);