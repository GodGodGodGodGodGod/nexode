import type { IncomingMessage } from 'node:http';

export async function readRequestBody(
  request: IncomingMessage,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }

      try {
        const body = JSON.parse(
          Buffer.concat(chunks).toString(),
        );

        resolve(body);
      } catch (error) {
        reject(error);
      }
    });

    request.on('error', reject);
  });
}