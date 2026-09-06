import {
  randomBytes,
  scrypt,
  timingSafeEqual,
} from 'node:crypto';

import {
  promisify,
} from 'node:util';

import type {
  PasswordHasher,
} from './passwordHasher.js';

const scryptAsync =
  promisify(scrypt);

const KEY_LENGTH = 64;

export class SecurePasswordHasher
  implements PasswordHasher {

  async hash(
    password: string,
  ): Promise<string> {
    const salt =
      randomBytes(16)
        .toString('hex');

    const derivedKey =
      await scryptAsync(
        password,
        salt,
        KEY_LENGTH,
      ) as Buffer;

    return [
      'scrypt',
      salt,
      derivedKey.toString('hex'),
    ].join('$');
  }

  async verify(
  password: string,
  hash: string,
): Promise<boolean> {
  const parts =
    hash.split('$');

  if (
    parts.length !== 3
  ) {
    return false;
  }

  const algorithm =
    parts[0];

  const salt =
    parts[1];

  const storedKey =
    parts[2];

  if (
    !algorithm ||
    !salt ||
    !storedKey
  ) {
    return false;
  }

  if (
    algorithm !== 'scrypt'
  ) {
    return false;
  }

  const storedBuffer =
    Buffer.from(
      storedKey,
      'hex',
    );

  if (
    storedBuffer.length === 0
  ) {
    return false;
  }

  const derivedKey =
    await scryptAsync(
      password,
      salt,
      storedBuffer.length,
    ) as Buffer;

  if (
    derivedKey.length !==
    storedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    derivedKey,
    storedBuffer,
  );
}
}