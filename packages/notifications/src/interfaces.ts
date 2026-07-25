import type {
  Notification,
  NotificationResult,
} from './types.js';

export interface NotificationProvider {
  send(
    notification: Notification,
  ): Promise<NotificationResult>;
}