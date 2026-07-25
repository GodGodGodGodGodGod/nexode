import {
  getContainer,
} from './container.js';

export function resolve<T>(
  token: string,
): T {
  return getContainer().resolve<T>(
    token,
  );
}