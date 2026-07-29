import type {
  SecurityConfig,
} from './securityConfig.js';

export const defaultSecurityConfig: SecurityConfig = {
  cors: {
    origin: '*',
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    headers: [
      'Content-Type',
      'Authorization',
    ],
    credentials: false,
    maxAge: 86400,
  },

  maxBodySize: 1024 * 1024,

  trustProxy: false,
};