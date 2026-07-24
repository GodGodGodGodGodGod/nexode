export interface TokenClaims {
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyTokenResult {
  subject: string;
  claims: TokenClaims;
}