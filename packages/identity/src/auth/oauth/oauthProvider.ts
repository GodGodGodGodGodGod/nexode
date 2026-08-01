import type {
  OAuthProfile,
} from './oauthProfile.js';

export interface OAuthProvider {
  authenticate(
    authorizationCode: string,
  ): Promise<OAuthProfile>;
}