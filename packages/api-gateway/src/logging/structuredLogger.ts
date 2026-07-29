import type {
  Logger,
} from './logger.js';

import type {
  LogProvider,
} from './logProvider.js';

import type {
  LogLevel,
} from './logLevel.js';

export class StructuredLogger
  implements Logger {

  constructor(
    private readonly provider: LogProvider,
  ) {}

  async log(
    level: LogLevel,
    message: string,
    context?: Record<
      string,
      unknown
    >,
  ): Promise<void> {

    await this.provider.log({
      level,
      message,
      timestamp: new Date(),
      context,
    });
  }
}