import type {
  PasswordHasher,
} from './passwordHasher.js';

export class NoopPasswordHasher
  implements PasswordHasher {

  async hash(
    password: string,
  ): Promise<string> {

    return password;
  }

  async verify(
    password: string,
    hash: string,
  ): Promise<boolean> {

    return password === hash;
  }
}