/// <reference types="node" />

import { Buffer } from 'buffer';
import {
  NodeCrypto,
  NodeHasher,
  getCrypto,
  getHasher,
  setCrypto,
  setHasher,
} from '../src/index.js';

async function main() {
  const crypto = new NodeCrypto(
    Buffer.alloc(32),
  );

  const hasher = new NodeHasher();

  setCrypto(crypto);
  setHasher(hasher);

  const hash =
    await getHasher().hash(
      'nexode',
    );

  console.log(
    await getHasher().verify(
      'nexode',
      hash,
    ),
  );

  const encrypted =
    await getCrypto().encrypt(
      'Hello NeXoDe',
    );

  console.log(
    await getCrypto().decrypt(
      encrypted,
    ),
  );
}

main().catch(console.error);