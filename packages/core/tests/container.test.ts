import {
  bootstrap,
  resolve,
  LOGGER_SERVICE,
  CACHE_SERVICE,
  DATABASE_SERVICE,
} from '../src/index.js';

async function main(): Promise<void> {
  await bootstrap();

  const logger =
    resolve(LOGGER_SERVICE);

  const loggerAgain =
    resolve(LOGGER_SERVICE);

  console.log(logger);
  console.log(resolve(CACHE_SERVICE));
  console.log(resolve(DATABASE_SERVICE));

  console.log(
    logger === loggerAgain,
  );

  console.log(
    'Core Runtime OK',
  );
}

main().catch(console.error);