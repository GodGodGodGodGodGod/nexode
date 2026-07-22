export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class ConfigurationValidationError extends ConfigurationError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationValidationError';
  }
}