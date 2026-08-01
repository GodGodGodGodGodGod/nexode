import type {
  TotpSecret,
} from './totpSecret.js';

export interface TotpStore {
  save(
    secret: TotpSecret,
  ): Promise<void>;

  findByUserId(
    userId: string,
  ): Promise<TotpSecret | undefined>;
}