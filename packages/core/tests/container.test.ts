import {
  bootstrap,
  resolve,
  LOGGER_SERVICE,
  CACHE_SERVICE,
  DATABASE_SERVICE,
} from '../src/index.js';

async function main(): Promise<void> {
  await bootstrap();

  console.log(resolve(LOGGER_SERVICE));
  console.log(resolve(CACHE_SERVICE));
  console.log(resolve(DATABASE_SERVICE));

  console.log('Core Runtime OK');
}

main().catch(console.error);