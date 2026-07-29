import { bootstrap } from '../bootstrap.js';

export class RuntimeBuilder {
  async build() {
    return bootstrap();
  }
}