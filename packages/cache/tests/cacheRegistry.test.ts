import {
  getCache,
  setCache,
  MemoryCache,
} from '../src/index.js';

async function main() {
  const cache = new MemoryCache();

  setCache(cache);

  const current = getCache();

  await current.set(
    'username',
    'Joshua',
  );

  console.log(
    await current.get('username'),
  );

  console.log(
    await current.has('username'),
  );

  console.log(
    await current.stats(),
  );

  await current.clear();
}

main().catch(console.error);