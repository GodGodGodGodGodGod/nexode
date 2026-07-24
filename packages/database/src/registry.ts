import type { DatabaseClient } from './client.js';

let currentClient: DatabaseClient | null = null;

export function getDatabaseClient(): DatabaseClient {
  if (!currentClient) {
    throw new Error(
      'Database client has not been registered.'
    );
  }

  return currentClient;
}

export function setDatabaseClient(
  client: DatabaseClient,
): void {
  currentClient = client;
}