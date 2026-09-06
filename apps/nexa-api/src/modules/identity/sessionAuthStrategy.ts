import type {
  AuthStrategy,
  GatewayRequest,
} from '@nexode/api-gateway';

import type {
  UserRepository,
  SessionManager,
} from '@nexode/identity';

export class SessionAuthStrategy
  implements AuthStrategy {

  constructor(
    private readonly sessions: SessionManager,
    private readonly users: UserRepository,
  ) {}

  async authenticate(
    request: GatewayRequest,
  ) {
    const authorization =
      request.headers.authorization;

    if (!authorization) {
      return {
        authenticated: false,
      };
    }

    const [
      scheme,
      sessionId,
    ] = authorization.split(' ');

    if (
      scheme !== 'Bearer' ||
      !sessionId
    ) {
      return {
        authenticated: false,
      };
    }

    const session =
  await this.sessions.validate(
    sessionId,
  );

if (!session) {
  return {
    authenticated: false,
  };
}

    const user =
      await this.users.findById(
        session.userId,
      );

    if (!user || !user.enabled) {
      return {
        authenticated: false,
      };
    }

    return {
  authenticated: true,

  sessionId: session.id,

  user: {
    id: user.id,
    roles: [
      ...user.roles,
    ],
    permissions: [
      ...user.permissions,
    ],
  },
};
  }
}