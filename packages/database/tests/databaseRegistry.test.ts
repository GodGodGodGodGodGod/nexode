import {
  getDatabaseClient,
  setDatabaseClient,
  MemoryDatabaseClient,
} from '../src/index.js';

async function main() {
  const client = new MemoryDatabaseClient();

  setDatabaseClient(client);

  const database = getDatabaseClient();

  await database.connect();

  console.log(
    'Database Client:',
    database.constructor.name,
  );

  await database.disconnect();
}

main().catch(console.error);