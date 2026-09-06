export interface TotpSecretGenerator {
  generate(): Promise<string>;
}