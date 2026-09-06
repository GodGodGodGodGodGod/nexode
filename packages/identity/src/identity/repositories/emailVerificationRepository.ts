import type {
  EmailVerificationToken,
} from '../models/emailVerificationToken.js';

export interface EmailVerificationRepository {
  findByToken(
    token: string,
  ): Promise<
    EmailVerificationToken | undefined
  >;

  findByUserId(
    userId: string,
  ): Promise<
    EmailVerificationToken | undefined
  >;

  save(
    token: EmailVerificationToken,
  ): Promise<void>;

  update(
    token: EmailVerificationToken,
  ): Promise<void>;

  deleteByUserId(
    userId: string,
  ): Promise<void>;
}