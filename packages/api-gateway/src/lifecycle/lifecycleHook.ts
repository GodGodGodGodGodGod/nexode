export interface LifecycleHook {
  onInitialize?(): void | Promise<void>;

  onStart?(): void | Promise<void>;

  onStop?(): void | Promise<void>;
}