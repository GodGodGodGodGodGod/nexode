import type {
  StorageProvider,
} from './interfaces.js';

let provider: StorageProvider | null =
  null;

export function setStorage(
  storage: StorageProvider,
): void {
  provider = storage;
}

export function getStorage(): StorageProvider {
  if (!provider) {
    throw new Error(
      'Storage provider has not been registered.',
    );
  }

  return provider;
}