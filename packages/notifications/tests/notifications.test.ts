/// <reference types="node" />

import {
  ConsoleNotificationProvider,
  getNotifications,
  setNotifications,
} from '../src/index.js';

async function main() {
  const provider =
    new ConsoleNotificationProvider();

  setNotifications(provider);

  const result =
    await getNotifications().send({
      channel: 'console',
      title: 'NeXoDe',
      message:
        'Notifications package is working.',
    });

  console.log(result);
}

main().catch(console.error);