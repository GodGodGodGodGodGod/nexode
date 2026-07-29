import type {
  LifecycleHook,
} from './lifecycleHook.js';

export class LifecycleManager {

  private readonly hooks: LifecycleHook[] = [];

  register(
    hook: LifecycleHook,
  ): void {
    this.hooks.push(hook);
  }

  async initialize(): Promise<void> {
    for (const hook of this.hooks) {
      await hook.onInitialize?.();
    }
  }

  async start(): Promise<void> {
    for (const hook of this.hooks) {
      await hook.onStart?.();
    }
  }

  async stop(): Promise<void> {
    for (const hook of [...this.hooks].reverse()) {
      await hook.onStop?.();
    }
  }
}