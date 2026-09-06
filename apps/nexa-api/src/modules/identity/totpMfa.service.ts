import type {
  TotpSetupService,
} from '@nexode/identity';

import {
  TotpProvider,
} from '@nexode/identity';

export class TotpMfaService {
  constructor(
    private readonly setupService:
      TotpSetupService,

    private readonly provider:
      TotpProvider,
  ) {}

  async setup(
    userId: string,
    email: string,
  ) {
    return this.setupService.setup(
      userId,
      email,
    );
  }

  async confirm(
    userId: string,
    code: string,
  ): Promise<boolean> {
    const confirmed =
      await this.setupService.confirm(
        userId,
        code,
      );

    if (!confirmed) {
      return false;
    }

    const result =
      await this.provider.verify({
        userId,
        code,
      });

    return result.verified;
  }
}