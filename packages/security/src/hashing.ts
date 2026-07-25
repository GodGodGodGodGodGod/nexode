import type { Hasher } from './interfaces.js';

let currentHasher: Hasher | null = null;

export function setHasher(
  hasher: Hasher,
): void {
  currentHasher = hasher;
}

export function getHasher(): Hasher {
  if (!currentHasher) {
    throw new Error(
      'Hasher has not been registered.',
    );
  }

  return currentHasher;
}