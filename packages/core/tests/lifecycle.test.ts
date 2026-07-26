import {
  LifecycleManager,
} from '../src/index.js';

class DemoService {
  async start(): Promise<void> {
    console.log('starting');
  }

  async stop(): Promise<void> {
    console.log('stopping');
  }
}

async function main() {
  const manager =
    new LifecycleManager();

  manager.register(
    new DemoService(),
  );

  await manager.start();

  await manager.stop();

  console.log(
    'Lifecycle OK',
  );
}

main().catch(console.error);