import type {
  IdentityUser,
} from '../identity/index.js';

export interface PolicyContext {
  readonly user?: IdentityUser;

  readonly action: string;

  readonly resource: string;

  readonly metadata?: Record<
    string,
    unknown
  >;
}