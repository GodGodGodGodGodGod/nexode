export interface OAuthProfile {
  readonly provider: string;

  readonly providerUserId: string;

  readonly email: string;

  readonly displayName?: string;

  readonly avatarUrl?: string;
}