import type {
  NotificationProvider,
} from './interfaces.js';

let provider:
  | NotificationProvider
  | null = null;

export function setNotifications(
  notifications: NotificationProvider,
): void {
  provider = notifications;
}

export function getNotifications(): NotificationProvider {
  if (!provider) {
    throw new Error(
      'Notification provider has not been registered.',
    );
  }

  return provider;
}