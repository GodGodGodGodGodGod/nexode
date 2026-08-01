import type {
  Permission,
} from './permission.js';

export interface Role {

  readonly name: string;

  readonly permissions:
    readonly Permission[];
}