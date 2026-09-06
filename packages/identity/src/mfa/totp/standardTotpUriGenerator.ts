import type {
  TotpUriGenerator,
} from './totpUriGenerator.js';

export class StandardTotpUriGenerator
  implements TotpUriGenerator {

  generate(
    secret: string,
    issuer: string,
    accountName: string,
  ): string {
    const label =
      `${issuer}:${accountName}`;

    const encodedLabel =
      encodeURIComponent(
        label,
      );

    const params =
      new URLSearchParams({
        secret,
        issuer,
      });

    return (
      `otpauth://totp/${encodedLabel}` +
      `?${params.toString()}`
    );
  }
}