import type {
  UserRepository,
  PasswordResetRepository,
  PasswordResetToken,
} from '@nexode/identity';

export interface ForgotPasswordResult {
  readonly message: string;

  readonly resetToken?: string;
}

export class ForgotPasswordService {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordResets:
      PasswordResetRepository,
  ) {}

  async request(
    email: string,
  ): Promise<ForgotPasswordResult> {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.users.findByEmail(
        normalizedEmail,
      );

    // Do not reveal whether an email exists.
    if (!user) {
      return {
        message:
          'If an account exists with this email, a password reset link has been sent.',
      };
    }

    const now = new Date();

    const expiresAt = new Date(
      now.getTime() +
      1000 * 60 * 30,
    );

    const reset: PasswordResetToken = {
      id: crypto.randomUUID(),
      userId: user.id,
      token: crypto.randomUUID(),
      createdAt: now,
      expiresAt,
    };

    await this.passwordResets.create(
      reset,
    );

    return {
      message:
        'If an account exists with this email, a password reset link has been sent.',

      // Development only.
      // Later this token will be sent by email.
      resetToken: reset.token,
    };
  }
}