import { createEvent } from '../src/event.js';
import { InMemoryEventBus } from '../src/bus.js';

const bus = new InMemoryEventBus();

bus.subscribe('user.created', async (event) => {
  console.log(event.payload);
});

await bus.publish(
  createEvent(
    'user.created',
    {
      id: '123',
      name: 'Alice',
    },
    'tests'
  )
);