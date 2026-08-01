import type {
  Permission,
} from './permission.js';

import type {
  Resource,
} from './resource.js';

import type {
  Subject,
} from './subject.js';

export interface AuthorizationRequest {

  readonly subject: Subject;

  readonly permission: Permission;

  readonly resource?: Resource;
}