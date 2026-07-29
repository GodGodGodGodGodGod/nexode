import type { ServiceContainer } from '../interfaces.js';
import type { PluginManager } from '../plugins/index.js';
import type { LifecycleManager } from '../lifecycle/index.js';

export class ApplicationContext {
  constructor(
    public readonly container: ServiceContainer,
    public readonly lifecycle: LifecycleManager,
    public readonly plugins: PluginManager,
  ) {}
}