/**
 * @deprecated
 * Runtime composition now lives in @nexode/runtime.
 * Import bootstrap() from @nexode/runtime instead.
 */

export async function bootstrap(): Promise<never> {
  throw new Error(
    'bootstrap() has moved to @nexode/runtime.',
  );
}