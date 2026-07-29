import type {
  GatewayResponse,
} from '../types/index.js';

export function applySecurityHeaders(
  response: GatewayResponse,
): void {
  response.header(
    'X-Content-Type-Options',
    'nosniff',
  );

  response.header(
    'X-Frame-Options',
    'DENY',
  );

  response.header(
    'Referrer-Policy',
    'no-referrer',
  );

  response.header(
    'X-XSS-Protection',
    '1; mode=block',
  );
}