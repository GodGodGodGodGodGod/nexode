import type {
  SessionRepository,
} from '../repositories/sessionRepository.js';

export class SessionService {
  constructor(
    private readonly sessions: SessionRepository,
  ) {}

  findById(
    id: string,
  ) {
    return this.sessions.findById(id);
  }

  revoke(
    id: string,
  ) {
    return this.sessions.delete(id);
  }
}