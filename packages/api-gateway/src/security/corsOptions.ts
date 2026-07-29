export type CorsOrigin =
  | string
  | ReadonlyArray<string>;

export interface CorsOptions {
  readonly origin?: CorsOrigin;

  readonly methods?: ReadonlyArray<string>;

  readonly headers?: ReadonlyArray<string>;

  readonly credentials?: boolean;

  readonly maxAge?: number;
}