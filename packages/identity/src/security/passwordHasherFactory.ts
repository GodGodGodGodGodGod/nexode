import type {
  PasswordHasher,
} from './passwordHasher.js';

export class PasswordHasherFactory {
  constructor(
    private readonly hasher: PasswordHasher,
  ) {}

  getHasher(): PasswordHasher {
    return this.hasher;
  }
}