const MIN_USERNAME_LENGTH = 3;

const MAX_USERNAME_LENGTH = 30;

const USERNAME_PATTERN =
  /^[a-z0-9_]+$/;

const RESERVED_USERNAMES =
  new Set([
    'admin',
    'administrator',
    'api',
    'auth',
    'login',
    'logout',
    'register',
    'support',
    'help',
    'nexa',
    'nexode',
    'system',
    'root',
    'users',
    'user',
    'profile',
    'profiles',
    'settings',
    'official',
  ]);

export function normalizeUsername(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

export function validateUsername(
  username: string,
): void {
  if (
    username.length <
    MIN_USERNAME_LENGTH
  ) {
    throw new Error(
      'Username must be at least 3 characters.',
    );
  }

  if (
    username.length >
    MAX_USERNAME_LENGTH
  ) {
    throw new Error(
      'Username cannot exceed 30 characters.',
    );
  }

  if (
    !USERNAME_PATTERN.test(
      username,
    )
  ) {
    throw new Error(
      'Username can only contain lowercase letters, numbers, and underscores.',
    );
  }

  if (
    RESERVED_USERNAMES.has(
      username,
    )
  ) {
    throw new Error(
      'This username is reserved.',
    );
  }
}