export interface RegisterUserRequest {
  readonly email: string;

  readonly password: string;

  readonly username?: string;

  readonly displayName?: string;
}

export interface LoginRequest {
  readonly email: string;

  readonly password: string;
}

export interface IdentityResponse {
  readonly id: string;

  readonly email: string;

  readonly username?: string;

  readonly displayName?: string;

  readonly verificationToken?: string;
}
export interface LoginSuccessResponse {
  readonly user: IdentityResponse;

  readonly sessionId: string;

  readonly expiresAt: string;

  readonly mfaRequired?: false;
}

export interface LoginMfaRequiredResponse {
  readonly user: IdentityResponse;

  readonly mfaRequired: true;

  readonly mfaMethod: 'totp';

  readonly challengeId: string;

}

export type LoginResponse =
  | LoginSuccessResponse
  | LoginMfaRequiredResponse;

export interface VerifyEmailRequest {
  readonly token: string;
}
export interface ForgotPasswordRequest {
  readonly email: string;
}

export interface ResetPasswordRequest {
  readonly token: string;

  readonly password: string;
}

export interface SetupTotpResponse {
  readonly secret: string;

  readonly otpAuthUrl: string;
}

export interface ConfirmTotpRequest {
  readonly code: string;
}