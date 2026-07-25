/// <reference types="node" />

import {
  Buffer,
} from 'buffer';

import {
  LocalStorage,
  getStorage,
  setStorage,
} from '../src/index.js';

async function main() {
  const storage =
    new LocalStorage(
      './.storage',
    );

  setStorage(storage);

  await getStorage().upload(
    'hello.txt',
    Buffer.from(
      'Hello NeXoDe',
    ),
  );

  const file =
    await getStorage().download(
      'hello.txt',
    );

  console.log(
    Buffer.from(
      file.data,
    ).toString(),
  );

  console.log(
    await getStorage().exists(
      'hello.txt',
    ),
  );

  console.log(
    await getStorage().list(),
  );

  await getStorage().delete(
    'hello.txt',
  );
}

main().catch(console.error);