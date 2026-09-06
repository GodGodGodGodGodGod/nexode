import type {
  RouteDefinition,
} from '@nexode/api-gateway';

import {
  MemoryUserRepository,
  SecurePasswordHasher,
  MemorySessionStore,
  SessionManager,
  MemoryEmailVerificationRepository,
  EmailVerificationService,
  MemoryPasswordResetRepository,
  MemoryTotpStore,
  SecureTotpGenerator,
  SecureTotpSecretGenerator,
  StandardTotpUriGenerator,
  TotpSetupService,
} from '@nexode/identity';

import {
  IdentityController,
} from './identity.controller.js';

import {
  RegistrationService,
} from './registration.service.js';

import {
  LoginService,
} from './login.service.js';

import {
  SessionAuthStrategy,
} from './sessionAuthStrategy.js';

import {
  UserService,
} from './user.service.js';

import {
  SessionService,
} from './session.service.js';

import {
  LogoutService,
} from './logout.service.js';

import {
  ProfileService,
} from './profile.service.js';

import {
  UpdateProfileService,
} from './updateProfile.service.js';

import {
  ForgotPasswordService,
} from './forgotPassword.service.js';

import {
  ResetPasswordService,
} from './resetPassword.service.js';

import {
  ChangePasswordService,
} from './changePassword.service.js';

import {
  DeactivateAccountService,
} from './deactivateAccount.service.js';

import {
  MemoryAccountReactivationRepository,
} from '@nexode/identity';

import {
  RequestAccountReactivationService,
} from './requestAccountReactivation.service.js';

import {
  ConfirmAccountReactivationService,
} from './confirmAccountReactivation.service.js';

import {
  PasswordPolicyService,
} from './passwordPolicy.service.js';

import {
  MemoryAuditStore,
  AuditManager,
  MemoryMfaLoginChallengeStore,
} from '@nexode/identity';

import {
  SecurityAuditService,
} from './securityAudit.service.js';


export function createIdentityRoutes():
  readonly RouteDefinition[] {

  const users =
    new MemoryUserRepository();

  const passwordHasher =
  new SecurePasswordHasher();

  const passwordPolicy =
  new PasswordPolicyService();

const emailVerificationRepository =
  new MemoryEmailVerificationRepository();

const emailVerificationService =
  new EmailVerificationService(
    users,
    emailVerificationRepository,
  );

  const sessionStore =
    new MemorySessionStore();

  const sessionOptions = {
    idleTimeoutMs:
      1000 * 60 * 60 * 24,
    absoluteTimeoutMs:
      1000 * 60 * 60 * 24 * 7,
    allowMultipleSessions: true,
  };

  const sessionManager =
    new SessionManager(
      sessionStore,
      sessionOptions,
    );

    const auditStore =
  new MemoryAuditStore();

const auditManager =
  new AuditManager(
    auditStore,
  );

const securityAuditService =
  new SecurityAuditService(
    auditManager,
  );

    const authStrategy =
  new SessionAuthStrategy(
    sessionManager,
    users,
  );

  const registrationService =
    new RegistrationService(
      users,
      passwordHasher,
      emailVerificationService,
      passwordPolicy,
    );

    const totpStore =
  new MemoryTotpStore();

  const mfaChallenges =
  new MemoryMfaLoginChallengeStore();

  const loginService =
    new LoginService(
      users,
      passwordHasher,
      sessionManager,
      securityAuditService,
      totpStore,
      mfaChallenges,
    );

    const logoutService =
  new LogoutService(
    sessionManager,
    securityAuditService,
  );


  const sessionService =
  new SessionService(
    sessionManager,
    securityAuditService,
  );

    const userService =
  new UserService(
    users,
  );

const totpGenerator =
  new SecureTotpGenerator();

const totpSecretGenerator =
  new SecureTotpSecretGenerator();

const totpUriGenerator =
  new StandardTotpUriGenerator();

const totpSetupService =
  new TotpSetupService(
    totpStore,
    totpGenerator,
    totpSecretGenerator,
    totpUriGenerator,
  );



  const profileService =
  new ProfileService(
    users,
  );

  const updateProfileService =
  new UpdateProfileService(
    users,
  );
  const passwordResetRepository =
  new MemoryPasswordResetRepository();
  const forgotPasswordService =
  new ForgotPasswordService(
    users,
    passwordResetRepository,
  );

const resetPasswordService =
  new ResetPasswordService(
    users,
    passwordHasher,
    passwordResetRepository,
    sessionManager,
    passwordPolicy,
  );

  const accountReactivationRepository =
  new MemoryAccountReactivationRepository();

const requestAccountReactivationService =
  new RequestAccountReactivationService(
    users,
    accountReactivationRepository,
  );

const confirmAccountReactivationService =
  new ConfirmAccountReactivationService(
    users,
    accountReactivationRepository,
  );

  const changePasswordService =
  new ChangePasswordService(
    users,
    passwordHasher,
    sessionManager,
    passwordPolicy,
    securityAuditService,
  );

const deactivateAccountService =
  new DeactivateAccountService(
    users,
    sessionStore,
  );

  const controller =
  new IdentityController(
    registrationService,
    loginService,
    sessionService,
    securityAuditService,
    logoutService,
    userService,
    profileService,
    updateProfileService,
    emailVerificationService,
    forgotPasswordService,
    resetPasswordService,
    changePasswordService,
    deactivateAccountService,
    requestAccountReactivationService,
    confirmAccountReactivationService,
    totpSetupService,
  );

  return [
    {
      method: 'POST',
      path: '/auth/register',
      handler:
        controller.register.bind(
          controller,
        ),
    },
    {
  method: 'POST',
  path: '/auth/verify-email',
  handler:
    controller.verifyEmail.bind(
      controller,
    ),
},
    {
      method: 'POST',
      path: '/auth/login',
      handler:
        controller.login.bind(
          controller,
        ),
    },
    {
  method: 'POST',
  path: '/auth/forgot-password',
  handler:
    controller.forgotPassword.bind(
      controller,
    ),
},
{
  method: 'POST',
  path: '/auth/reset-password',
  handler:
    controller.resetPassword.bind(
      controller,
    ),
},
{
  method: 'POST',
  path: '/auth/request-reactivation',
  handler:
    controller.requestAccountReactivation.bind(
      controller,
    ),
},
{
  method: 'POST',
  path: '/auth/confirm-reactivation',
  handler:
    controller.confirmAccountReactivation.bind(
      controller,
    ),
},
    {
      method: 'POST',
      path: '/auth/logout',
      handler:
        controller.logout.bind(
          controller,
        ),
        auth: authStrategy,
    },

    {
      method: 'GET',
      path: '/users/me',
      handler:
        controller.getCurrentUser.bind(
          controller,
        ),
        auth: authStrategy,
    },
    {
  method: 'GET',
  path: '/users/me/security-activity',
  handler:
    controller.getSecurityActivity.bind(
      controller,
    ),
  auth: authStrategy,
},
    {
  method: 'PATCH',
  path: '/users/me/profile',
  handler:
    controller.updateCurrentUserProfile.bind(
      controller,
    ),
  auth: authStrategy,
},
{
  method: 'POST',
  path: '/users/me/change-password',
  handler:
    controller.changePassword.bind(
      controller,
    ),
  auth: authStrategy,
},
{
  method: 'POST',
  path: '/users/me/deactivate',
  handler:
    controller.deactivateAccount.bind(
      controller,
    ),
  auth: authStrategy,
},
{
  method: 'POST',
  path: '/users/me/mfa/totp/setup',
  handler:
    controller.setupTotp.bind(
      controller,
    ),
  auth: authStrategy,
},
{
  method: 'POST',
  path: '/users/me/mfa/totp/confirm',
  handler:
    controller.confirmTotp.bind(
      controller,
    ),
  auth: authStrategy,
},
{
  method: 'GET',
  path: '/users/me/sessions',
  handler:
    controller.getSessions.bind(
      controller,
    ),
  auth: authStrategy,
},

{
  method: 'DELETE',
  path: '/users/me/sessions/others',
  handler:
    controller.revokeOtherSessions.bind(
      controller,
    ),
  auth: authStrategy,
},

{
  method: 'DELETE',
  path: '/users/me/sessions/:id',
  handler:
    controller.revokeSession.bind(
      controller,
    ),
  auth: authStrategy,
},

    {
      method: 'GET',
      path: '/users/:id',
      handler:
        controller.getUser.bind(
          controller,
        ),
        auth: authStrategy,
    },
    {
  method: 'GET',
  path: '/profiles/:username',
  handler:
    controller.getPublicProfile.bind(
      controller,
    ),
},
  ];
}