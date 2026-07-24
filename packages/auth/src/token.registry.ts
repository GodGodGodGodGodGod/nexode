import type { TokenService } from './interfaces.js';
import { MemoryTokenService } from './memory/memoryTokenService.js';

let currentTokenService: TokenService = new MemoryTokenService();

export function getTokenService(): TokenService {
  return currentTokenService;
}

export function setTokenService(service: TokenService): void {
  currentTokenService = service;
}