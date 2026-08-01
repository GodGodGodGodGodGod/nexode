export interface TotpGenerator {
  generate(
    secret: string,
  ): Promise<string>;

  verify(
    secret: string,
    code: string,
  ): Promise<boolean>;
}