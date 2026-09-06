import type {
  SessionManager,
  TotpGenerator,
  TotpStore,
  UserRepository,
} from '@nexode/identity';

import type {
  MfaLoginChallengeStore,
} from './memoryMfaLoginChallengeStore.js';

export interface MfaLoginVerificationResult {
  readonly userId: string;

  readonly sessionId: string;

  readonly expiresAt: string;
}

export class MfaLoginVerificationService {
  constructor(
    private readonly users: UserRepository,
    private readonly challenges: MfaLoginChallengeStore,
    private readonly totpStore: TotpStore,
    private readonly totpGenerator: TotpGenerator,
    private readonly sessions: SessionManager,
  ) {}

  async verify(
    challengeId: string,
    code: string,
  ): Promise<MfaLoginVerificationResult> {
    const challenge =
      await this.challenges.findById(
        challengeId,
      );

    if (!challenge) {
      throw new Error(
        'Invalid or expired MFA challenge.',
      );
    }

    if (
      challenge.expiresAt.getTime() <=
      Date.now()
    ) {
      await this.challenges.delete(
        challengeId,
      );

      throw new Error(
        'Invalid or expired MFA challenge.',
      );
    }

    const user =
      await this.users.findByEmail(
        challenge.email,
      );

    if (!user || !user.enabled) {
      throw new Error(
        'Invalid or expired MFA challenge.',
      );
    }

    const totpSecret =
      await this.totpStore.findByUserId(
        challenge.userId,
      );

    if (!totpSecret?.enabled) {
      throw new Error(
        'MFA is not configured.',
      );
    }

    const valid =
      await this.totpGenerator.verify(
        totpSecret.secret,
        code,
      );

    if (!valid) {
      throw new Error(
        'Invalid MFA code.',
      );
    }

    await this.challenges.delete(
      challengeId,
    );

    const now = new Date();

    const session =
      await this.sessions.create({
        id: crypto.randomUUID(),
        userId: user.id,
        createdAt: now,
        ipAddress:
          challenge.ipAddress,
        userAgent:
          challenge.userAgent,
      });

    return {
      userId: user.id,
      sessionId: session.id,
      expiresAt:
        session.expiresAt.toISOString(),
    };
  }
}