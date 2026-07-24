import {
  SignJWT,
  jwtVerify,
} from 'jose';

import type {
  TokenService,
} from '../../interfaces.js';

import type {
  UserIdentity,
} from '../../types.js';

import type {
  TokenPair,
  VerifyTokenResult,
} from '../../token.types.js';

import type {
  JwtOptions,
} from './jwt.types.js';

export class JwtTokenService implements TokenService {
  constructor(
    private readonly options: JwtOptions,
  ) {}

  async issue(
    user: UserIdentity,
  ): Promise<TokenPair> {
    const accessToken = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(user.id)
      .setIssuer(this.options.issuer)
      .setAudience(this.options.audience)
      .setIssuedAt()
      .setExpirationTime(
        `${this.options.accessTokenLifetime}s`,
      )
      .sign(this.options.secret);

    const refreshToken = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(user.id)
      .setIssuer(this.options.issuer)
      .setAudience(this.options.audience)
      .setIssuedAt()
      .setExpirationTime(
        `${this.options.refreshTokenLifetime}s`,
      )
      .sign(this.options.secret);

    return {
      accessToken,
      refreshToken,
    };
  }

async verify(
  token: string,
): Promise<VerifyTokenResult> {
  const { payload } = await jwtVerify(
    token,
    this.options.secret,
    {
      issuer: this.options.issuer,
      audience: this.options.audience,
    },
  );

  const audience = Array.isArray(payload.aud)
    ? payload.aud[0]
    : payload.aud;

  if (!audience) {
    throw new Error('JWT payload is missing audience.');
  }

  if (!payload.sub) {
    throw new Error('JWT payload is missing subject.');
  }

  if (!payload.iss) {
    throw new Error('JWT payload is missing issuer.');
  }

  if (payload.iat === undefined) {
    throw new Error('JWT payload is missing issued-at time.');
  }

  if (payload.exp === undefined) {
    throw new Error('JWT payload is missing expiration time.');
  }

  return {
    subject: payload.sub,
    claims: {
      sub: payload.sub,
      iss: payload.iss,
      aud: audience,
      iat: payload.iat,
      exp: payload.exp,
    },
  };
}

  async refresh(): Promise<TokenPair> {
    throw new Error(
      'Refresh token rotation is not implemented yet.',
    );
  }
}