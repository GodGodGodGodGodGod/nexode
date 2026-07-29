import type {
  LogProvider,
} from './logProvider.js';

import type {
  LogEntry,
} from './logEntry.js';

export class ConsoleLogProvider
  implements LogProvider {

  async log(
    entry: LogEntry,
  ): Promise<void> {
    console.log(
      JSON.stringify(entry),
    );
  }
}