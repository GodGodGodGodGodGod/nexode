export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class TransactionError extends DatabaseError {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionError';
  }
}

export class RepositoryError extends DatabaseError {
  constructor(message: string) {
    super(message);
    this.name = 'RepositoryError';
  }
}