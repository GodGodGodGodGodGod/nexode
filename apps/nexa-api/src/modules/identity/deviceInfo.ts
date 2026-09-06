export type DeviceType =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'unknown';

export interface DeviceInfo {
  readonly type: DeviceType;

  readonly platform: string;

  readonly browser?: string;

  readonly name: string;
}

export function parseDeviceInfo(
  userAgent?: string,
): DeviceInfo {
  if (!userAgent) {
    return {
      type: 'unknown',
      platform: 'Unknown',
      name: 'Unknown device',
    };
  }

  const normalized =
    userAgent.toLowerCase();

  const isIphone =
    normalized.includes('iphone');

  const isIpad =
    normalized.includes('ipad');

  const isAndroid =
    normalized.includes('android');

  const isWindows =
    normalized.includes('windows');

  const isMac =
    normalized.includes('macintosh') ||
    normalized.includes('mac os');

  const isLinux =
    normalized.includes('linux');

  const isSamsung =
    normalized.includes('samsung') ||
    normalized.includes('sm-');

  const isNexa =
    normalized.includes('nexa');

  let browser: string | undefined;

  if (
    normalized.includes('samsungbrowser/')
  ) {
    browser = 'Samsung Internet';
  } else if (
    normalized.includes('edg/')
  ) {
    browser = 'Microsoft Edge';
  } else if (
    normalized.includes('firefox/')
  ) {
    browser = 'Firefox';
  } else if (
    normalized.includes('chrome/')
  ) {
    browser = 'Chrome';
  } else if (
    normalized.includes('safari/')
  ) {
    browser = 'Safari';
  }

  if (isNexa) {
    return {
      type: isAndroid || isIphone
        ? 'mobile'
        : 'unknown',

      platform:
        isIphone
          ? 'iOS'
          : isAndroid
            ? 'Android'
            : 'NeXa',

      name: 'NeXa App',
    };
  }

  if (isIphone) {
    return {
      type: 'mobile',
      platform: 'iOS',
      browser,
      name: 'iPhone',
    };
  }

  if (isIpad) {
    return {
      type: 'tablet',
      platform: 'iPadOS',
      browser,
      name: 'iPad',
    };
  }

  if (isSamsung) {
    return {
      type: 'mobile',
      platform: 'Android',
      browser,
      name: 'Samsung device',
    };
  }

  if (isAndroid) {
    return {
      type: 'mobile',
      platform: 'Android',
      browser,
      name: 'Android device',
    };
  }

  if (isWindows) {
    return {
      type: 'desktop',
      platform: 'Windows',
      browser,
      name: 'Windows PC',
    };
  }

  if (isMac) {
    return {
      type: 'desktop',
      platform: 'macOS',
      browser,
      name: 'Mac',
    };
  }

  if (isLinux) {
    return {
      type: 'desktop',
      platform: 'Linux',
      browser,
      name: 'Linux device',
    };
  }

  return {
    type: 'unknown',
    platform: 'Unknown',
    browser,
    name: 'Unknown device',
  };
}