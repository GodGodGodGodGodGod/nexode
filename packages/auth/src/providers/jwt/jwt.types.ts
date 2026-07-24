export interface JwtOptions {
  issuer: string;
  audience: string;
  accessTokenLifetime: number;
  refreshTokenLifetime: number;
  secret: Uint8Array;
}