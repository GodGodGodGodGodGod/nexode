import type {
  UserRepository,
} from '../repositories/userRepository.js';

export class UserService {
  constructor(
    private readonly users: UserRepository,
  ) {}

  findById(
    id: string,
  ) {
    return this.users.findById(id);
  }

  findByEmail(
    email: string,
  ) {
    return this.users.findByEmail(email);
  }
}