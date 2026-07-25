export type NotificationChannel =
  | 'console'
  | 'email'
  | 'sms'
  | 'push'
  | 'webhook'
  | 'in-app';

export interface Notification {
  title: string;
  message: string;
  channel: NotificationChannel;
}

export interface NotificationResult {
  success: boolean;
  id: string;
}