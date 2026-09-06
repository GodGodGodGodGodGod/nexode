export interface TotpUriGenerator {
  generate(
    secret: string,
    issuer: string,
    accountName: string,
  ): string;
}