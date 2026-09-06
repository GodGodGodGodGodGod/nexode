import { bootstrap } from '@nexode/runtime';
import {
  ApiGateway,
  NodeHttpAdapter,
} from '@nexode/api-gateway';

import {
  registerRoutes,
} from './routes/registerRoutes.js';

async function main(): Promise<void> {
  await bootstrap();

  const gateway = new ApiGateway(
    new NodeHttpAdapter(),
  );

  await gateway.initialize();

  registerRoutes(gateway);

  gateway.group('/api/v1', (api) => {
    api.get('/health', async (_request, response) => {
      response.send({
        status: 'ok',
        service: 'nexa-api',
      });
    });
  });

  await gateway.start();

  console.log(
    'NeXa API is running on port 3000',
  );
}

main().catch((error: unknown) => {
  console.error(
    'Failed to start NeXa API:',
    error,
  );

  process.exitCode = 1;
});