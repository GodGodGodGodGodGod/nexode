import type {
  Lifecycle,
} from './lifecycle.types.js';

export class LifecycleManager {
  private readonly services: Lifecycle[] = [];

  register(
    service: Lifecycle,
  ): void {
    this.services.push(service);
  }

  async start(): Promise<void> {
    for (const service of this.services) {
      await service.start?.();
    }
  }

  async stop(): Promise<void> {
    for (
      const service of [...this.services].reverse()
    ) {
      await service.stop?.();
    }
  }
}