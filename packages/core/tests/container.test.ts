import { bootstrap } from '../src/index.js';

async function main(): Promise<void> {
  const app = await bootstrap();

  console.log(app.container);

  console.log('Runtime bootstrapped successfully');
}

main().catch(console.error);