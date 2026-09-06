import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';

import type {
  HttpAdapter,
} from './httpAdapter.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';
import { URL } from 'node:url';
import { readRequestBody } from '../utils/readRequestBody.js';

import {
  createRequestId,
} from '../logging/requestId.js';
import {
  createCorrelationId,
} from '../logging/correlationId.js';

export class NodeHttpAdapter implements HttpAdapter {
  private server?: Server;

  private handler?: (
    request: GatewayRequest,
    response: GatewayResponse,
  ) => Promise<void>;

  onRequest(
    handler: (
      request: GatewayRequest,
      response: GatewayResponse,
    ) => Promise<void>,
  ): void {
    this.handler = handler;
  }

  async listen(port: number): Promise<void> {
    this.server = createServer(
      (
        request: IncomingMessage,
        response: ServerResponse,
      ) => {
        void this.handle(request, response);
      },
    );

    await new Promise<void>((resolve) => {
      this.server!.listen(port, resolve);
    });
  }

  async close(): Promise<void> {
    if (!this.server) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.server!.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  private async handle(
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<void> {
    if (!this.handler) {
      response.statusCode = 500;
      response.end('Gateway not initialized');
      return;
    }

    const url = new URL(
  request.url ?? '/',
  'http://localhost',
);

const body =
  await readRequestBody(request);

const gatewayRequest: GatewayRequest = {

  requestId: createRequestId(),

  correlationId:
  createCorrelationId(),

  method: request.method ?? 'GET',

  path: url.pathname,

  headers: Object.fromEntries(
    Object.entries(
      request.headers,
    ).map(([key, value]) => [
      key,
      Array.isArray(value)
        ? value.join(',')
        : value ?? '',
    ]),
  ),

  ipAddress:
  request.socket.remoteAddress,

  params: {},

  query: Object.fromEntries(
  url.searchParams.entries(),
),

body,
};

    const gatewayResponse: GatewayResponse = {
      status(code: number) {
        response.statusCode = code;
        return this;
      },

      header(name: string, value: string) {
        response.setHeader(name, value);
        return this;
      },

      send(body: unknown) {
        response.end(JSON.stringify(body));
      },
    };

    await this.handler(
      gatewayRequest,
      gatewayResponse,
    );
  }
}