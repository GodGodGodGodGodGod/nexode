import type {
  Role,
} from './role.js';

export interface Subject {

  readonly id: string;

  readonly roles:
    readonly Role[];
}