import {
  bootstrap,
  resolve,
} from '../src/index.js';


class ExampleService {
  name = 'NeXoDe';
}


async function main() {

  await bootstrap();


  console.log(
    'Core runtime booted',
  );
}


main().catch(console.error);