import type {
  AuthorizationRequest,
} from '../authorizationRequest.js';

import type {
  AuthorizationResult,
} from '../authorizationResult.js';

import type {
  Authorizer,
} from '../authorizer.js';

export class RbacAuthorizer
  implements Authorizer {

  async authorize(
    request: AuthorizationRequest,
  ): Promise<AuthorizationResult> {

    const permission =
      request.permission.name;

    const allowed =
      request.subject.roles.some(
        role =>
          role.permissions.some(
            granted =>
              granted.name === permission,
          ),
      );

    if (allowed) {

      return {
        allowed: true,
      };

    }

    return {

      allowed: false,

      reason:
        `Permission "${permission}" denied.`,
    };
  }
}