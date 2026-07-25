import type {
  CryptoProvider,
} from './interfaces.js';

let currentCrypto: CryptoProvider | null =
  null;

export function setCrypto(
  provider: CryptoProvider,
): void {
  currentCrypto = provider;
}

export function getCrypto(): CryptoProvider {
  if (!currentCrypto) {
    throw new Error(
      'Crypto provider has not been registered.',
    );
  }

  return currentCrypto;
}