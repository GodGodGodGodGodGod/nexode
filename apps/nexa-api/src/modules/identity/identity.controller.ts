import type {
  GatewayRequest,
  GatewayResponse,
} from '@nexode/api-gateway';

import type {
  RegisterUserRequest,
  LoginRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ConfirmTotpRequest,
  SetupTotpResponse,
} from './identity.types.js';

import {
  RegistrationService,
} from './registration.service.js';
import {
  LoginService,
} from './login.service.js';

import {
  UserService,
} from './user.service.js';

import {
  LogoutService,
} from './logout.service.js';

import {
  ProfileService,
} from './profile.service.js';

import {
  UpdateProfileService,
} from './updateProfile.service.js';

import type {
  EmailVerificationService,
} from '@nexode/identity';

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
  RequestAccountReactivationService,
} from './requestAccountReactivation.service.js';

import {
  ConfirmAccountReactivationService,
} from './confirmAccountReactivation.service.js';

import {
  SessionService,
} from './session.service.js';

import {
  SecurityAuditService,
} from './securityAudit.service.js';

import type {
  TotpSetupService,
} from '@nexode/identity';

export class IdentityController {
  constructor(
  private readonly registrationService:
    RegistrationService,
  private readonly loginService:
    LoginService,
    private readonly sessionService:
  SessionService,
  private readonly securityAudit:
  SecurityAuditService,
  private readonly logoutService:
    LogoutService,
  private readonly userService:
    UserService,
  private readonly profileService:
    ProfileService,
  private readonly updateProfileService:
    UpdateProfileService,
  private readonly emailVerification:
    EmailVerificationService,
  private readonly forgotPasswordService:
    ForgotPasswordService,
  private readonly resetPasswordService:
    ResetPasswordService,
  private readonly changePasswordService:
    ChangePasswordService,
  private readonly deactivateAccountService:
    DeactivateAccountService,
  private readonly requestAccountReactivationService:
    RequestAccountReactivationService,
  private readonly confirmAccountReactivationService:
    ConfirmAccountReactivationService,
  private readonly totpSetupService:
    TotpSetupService,
  ) {}

  async register(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {
    try {
      const body =
        request.body as RegisterUserRequest;

      const user =
        await this.registrationService.register(
          body,
        );

      response.status(201).send({
        user,
      });
    } catch (error) {
      response.status(400).send({
        error:
          error instanceof Error
            ? error.message
            : 'Registration failed.',
      });
    }
  }

async login(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as LoginRequest;

    const userAgent =
  request.headers['user-agent'];

const result =
  await this.loginService.login(
    body,
    {
      ipAddress:
        request.ipAddress,

      userAgent:
        typeof userAgent === 'string'
          ? userAgent
          : undefined,
    },
  );

    response.status(200).send(
      result,
    );
  } catch (error) {
    response.status(401).send({
      error:
        error instanceof Error
          ? error.message
          : 'Login failed.',
    });
  }
}

async verifyEmail(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as VerifyEmailRequest;

    if (!body?.token) {
      response.status(400).send({
        error: 'Verification token is required.',
      });

      return;
    }

    await this.emailVerification.verify(
      body.token,
    );

    response.status(200).send({
      message: 'Email verified successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Email verification failed.',
    });
  }
}

async forgotPassword(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as ForgotPasswordRequest;

    if (!body?.email) {
      response.status(400).send({
        error: 'Email is required.',
      });

      return;
    }

    const result =
      await this.forgotPasswordService.request(
        body.email,
      );

    response.status(200).send(
      result,
    );
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Password reset request failed.',
    });
  }
}
async changePassword(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const body =
      request.body as {
        currentPassword?: string;
        newPassword?: string;
      };

    if (
      !body?.currentPassword ||
      !body?.newPassword
    ) {
      response.status(400).send({
        error:
          'Current password and new password are required.',
      });

      return;
    }

    if (!request.sessionId) {
  response.status(401).send({
    error: 'Authentication required.',
  });

  return;
}

const userAgent =
  request.headers['user-agent'];

await this.changePasswordService.change(
  request.user.id,
  {
    currentPassword:
      body.currentPassword,

    newPassword:
      body.newPassword,
  },
  {
    sessionId:
      request.sessionId,

    ipAddress:
      request.ipAddress,

    userAgent:
      typeof userAgent === 'string'
        ? userAgent
        : undefined,
  },
);

    response.status(200).send({
      message:
        ' Password changed successfully. Other sessions have been signed out. ',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Password change failed.',
    });
  }
}
async resetPassword(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as ResetPasswordRequest;

    await this.resetPasswordService.reset(
      body,
    );

    response.status(200).send({
      message:
        'Password reset successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Password reset failed.',
    });
  }
}

async getSecurityActivity(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const events =
      await this.securityAudit.getUserEvents(
        request.user.id,
      );

    response.status(200).send({
      events,
    });
  } catch (error) {
    response.status(500).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to get security activity.',
    });
  }
}

async getSessions(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    if (!request.sessionId) {
  response.status(401).send({
    error: 'Authentication required.',
  });

  return;
}

const sessions =
  await this.sessionService.getUserSessions(
    request.user.id,
    request.sessionId,
  );

    response.status(200).send({
      sessions,
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to get sessions.',
    });
  }
}

async revokeSession(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const sessionId =
      request.params.id;

    if (!sessionId) {
      response.status(400).send({
        error: 'Session ID is required.',
      });

      return;
    }

    if (!request.sessionId) {
  response.status(401).send({
    error: 'Authentication required.',
  });

  return;
}

await this.sessionService.revokeSession(
  request.user.id,
  sessionId,
  request.sessionId,
);

    response.status(200).send({
      message: 'Session revoked successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to revoke session.',
    });
  }
}

async revokeOtherSessions(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (
      !request.user ||
      !request.sessionId
    ) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    await this.sessionService.revokeOtherSessions(
      request.user.id,
      request.sessionId,
    );

    response.status(200).send({
      message:
        'All other sessions have been revoked.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to revoke other sessions.',
    });
  }
}

  async logout(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  if (!request.sessionId) {
    response.status(401).send({
      error: 'Authentication required.',
    });

    return;
  }

  await this.logoutService.logout(
  request.user!.id,
  request.sessionId,
);

  response.status(200).send({
    message: 'Logged out successfully.',
  });
}

  async getCurrentUser(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  if (!request.user) {
    response.status(401).send({
      error: 'Authentication required.',
    });

    return;
  }

  const user =
    await this.userService.getById(
      request.user.id,
    );

  if (!user) {
    response.status(404).send({
      error: 'User not found.',
    });

    return;
  }

  response.send({
    user,
  });
}

async getPublicProfile(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  const username =
    request.params.username;

  if (!username) {
    response.status(400).send({
      error: 'Username is required.',
    });

    return;
  }

  const profile =
    await this.profileService.getByUsername(
      username,
    );

  if (!profile) {
    response.status(404).send({
      error: 'Profile not found.',
    });

    return;
  }

  response.status(200).send({
    profile,
  });
}

async updateCurrentUserProfile(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const body =
      request.body as {
        username?: string;
        displayName?: string;
      };

    const profile =
      await this.updateProfileService.update(
        request.user.id,
        body,
      );

    response.send({
      profile,
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Profile update failed.',
    });
  }
}

  async getUser(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  const userId =
    request.params.id;

  if (!userId) {
    response.status(400).send({
      error: 'User ID is required.',
    });

    return;
  }

  const user =
    await this.userService.getById(
      userId,
    );

  if (!user) {
    response.status(404).send({
      error: 'User not found.',
    });

    return;
  }

  response.status(200).send({
    user,
  });
}
async deactivateAccount(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    await this.deactivateAccountService.deactivate(
      request.user.id,
    );

    response.status(200).send({
      message:
        'Account deactivated successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Account deactivation failed.',
    });
  }
}
async requestAccountReactivation(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as {
        email?: string;
      };

    if (!body?.email) {
      response.status(400).send({
        error: 'Email is required.',
      });

      return;
    }

    const result =
      await this.requestAccountReactivationService.request(
        body.email,
      );

    response.status(200).send(
      result,
    );
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Account reactivation request failed.',
    });
  }
}
async confirmAccountReactivation(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    const body =
      request.body as {
        token?: string;
      };

    if (!body?.token) {
      response.status(400).send({
        error:
          'Reactivation token is required.',
      });

      return;
    }

    await this.confirmAccountReactivationService.confirm(
      body.token,
    );

    response.status(200).send({
      message:
        'Account reactivated successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Account reactivation failed.',
    });
  }
}
async setupTotp(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const user =
      await this.userService.getById(
        request.user.id,
      );

    if (!user) {
      response.status(404).send({
        error: 'User not found.',
      });

      return;
    }

    const result =
      await this.totpSetupService.setup(
        user.id,
        user.email,
      );

    const responseBody:
      SetupTotpResponse = {
        secret: result.secret,
        otpAuthUrl: result.otpAuthUrl,
      };

    response.status(200).send(
      responseBody,
    );
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to set up TOTP.',
    });
  }
}

async confirmTotp(
  request: GatewayRequest,
  response: GatewayResponse,
): Promise<void> {
  try {
    if (!request.user) {
      response.status(401).send({
        error: 'Authentication required.',
      });

      return;
    }

    const body =
      request.body as ConfirmTotpRequest;

    if (!body?.code) {
      response.status(400).send({
        error: 'TOTP code is required.',
      });

      return;
    }

    const confirmed =
      await this.totpSetupService.confirm(
        request.user.id,
        body.code,
      );

    if (!confirmed) {
      response.status(400).send({
        error: 'Invalid TOTP code.',
      });

      return;
    }

    response.status(200).send({
      message:
        'Two-factor authentication enabled successfully.',
    });
  } catch (error) {
    response.status(400).send({
      error:
        error instanceof Error
          ? error.message
          : 'Failed to confirm TOTP.',
    });
  }
}
}