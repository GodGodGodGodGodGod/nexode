import { randomUUID } from 'node:crypto';

import type {
  NotificationProvider,
} from '../../interfaces.js';

import type {
  Notification,
  NotificationResult,
} from '../../types.js';

export class ConsoleNotificationProvider
  implements NotificationProvider
{
  async send(
    notification: Notification,
  ): Promise<NotificationResult> {
    console.log(
      `[${notification.channel.toUpperCase()}]`,
    );

    console.log(
      `Title: ${notification.title}`,
    );

    console.log(
      `Message: ${notification.message}`,
    );

    return {
      success: true,
      id: randomUUID(),
    };
  }
}