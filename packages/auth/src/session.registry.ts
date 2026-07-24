import type { SessionService } from './interfaces.js';
import { MemorySessionService } from './memory/memorySessionService.js';

let currentSessionService: SessionService = new MemorySessionService();

export function getSessionService(): SessionService {
  return currentSessionService;
}

export function setSessionService(service: SessionService): void {
  currentSessionService = service;
}