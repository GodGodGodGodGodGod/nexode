import type {
  MfaLoginChallenge,
} from './mfaLoginChallenge.js';

export interface MfaLoginChallengeStore {
  save(
    challenge: MfaLoginChallenge,
  ): Promise<void>;

  findById(
    challengeId: string,
  ): Promise<MfaLoginChallenge | undefined>;

  delete(
    challengeId: string,
  ): Promise<void>;
}

export class MemoryMfaLoginChallengeStore
  implements MfaLoginChallengeStore
{
  private readonly challenges =
    new Map<string, MfaLoginChallenge>();

  async save(
    challenge: MfaLoginChallenge,
  ): Promise<void> {
    this.challenges.set(
      challenge.id,
      challenge,
    );
  }

  async findById(
    challengeId: string,
  ): Promise<MfaLoginChallenge | undefined> {
    return this.challenges.get(
      challengeId,
    );
  }

  async delete(
    challengeId: string,
  ): Promise<void> {
    this.challenges.delete(
      challengeId,
    );
  }
}