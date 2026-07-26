import type {
  ServiceContainer,
} from '../interfaces.js';

import {
  LifecycleManager,
} from '../lifecycle/index.js';

import {
  PluginManager,
} from '../plugins/index.js';


export class ApplicationContext {

  constructor(
    public readonly container: ServiceContainer,

    public readonly lifecycle:
      LifecycleManager,

    public readonly plugins:
      PluginManager,
  ) {}

}