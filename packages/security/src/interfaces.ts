import type {
  EncryptionResult,
  HashOptions,
  RandomOptions,
} from './types.js';

export interface Hasher {
  hash(
    value: string,
    options?: HashOptions,
  ): Promise<string>;

  verify(
    value: string,
    hash: string,
  ): Promise<boolean>;
}

export interface CryptoProvider {
  encrypt(
    value: string,
  ): Promise<EncryptionResult>;

  decrypt(
    payload: EncryptionResult,
  ): Promise<string>;

  random(
    options?: RandomOptions,
  ): Promise<string>;

  sign(
    value: string,
  ): Promise<string>;

  verify(
    value: string,
    signature: string,
  ): Promise<boolean>;
}