import type { AuthService } from './interfaces.js';

let currentAuthService: AuthService | null = null;

export function getAuthService(): AuthService {
  if (!currentAuthService) {
    throw new Error(
      'Authentication service has not been registered.'
    );
  }

  return currentAuthService;
}

export function setAuthService(
  service: AuthService
): void {
  currentAuthService = service;
}