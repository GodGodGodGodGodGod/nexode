import type {
  UserRepository,
  AccountReactivationRepository,
  AccountReactivationToken,
} from '@nexode/identity';

export interface RequestAccountReactivationResult {
  readonly message: string;

  readonly reactivationToken?: string;
}

export class RequestAccountReactivationService {
  constructor(
    private readonly users: UserRepository,
    private readonly reactivations:
      AccountReactivationRepository,
  ) {}

  async request(
    email: string,
  ): Promise<RequestAccountReactivationResult> {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.users.findByEmail(
        normalizedEmail,
      );

    // Do not reveal whether an account exists.
    if (!user) {
      return {
        message:
          'If an account exists with this email, a reactivation link has been sent.',
      };
    }

    // Don't reveal account status unnecessarily.
    if (user.enabled) {
      return {
        message:
          'If an account exists with this email, a reactivation link has been sent.',
      };
    }

    const now = new Date();

    const expiresAt = new Date(
      now.getTime() +
      1000 * 60 * 30,
    );

    const reactivation: AccountReactivationToken = {
      id: crypto.randomUUID(),
      userId: user.id,
      token: crypto.randomUUID(),
      createdAt: now,
      expiresAt,
    };

    await this.reactivations.create(
      reactivation,
    );

    return {
      message:
        'If an account exists with this email, a reactivation link has been sent.',

      // Development only.
      // Later this token will be sent by email.
      reactivationToken:
        reactivation.token,
    };
  }
}