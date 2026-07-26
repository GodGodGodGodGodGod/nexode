import {
  DefaultContainer,
} from '../providers/default/index.js';

import {
  LifecycleManager,
} from '../lifecycle/index.js';

import {
  PluginManager,
} from '../plugins/index.js';

import {
  ApplicationContext,
} from '../context/index.js';

import {
  Runtime,
} from './runtime.js';

export class RuntimeBuilder {

  async build(): Promise<Runtime> {

    const container =
      new DefaultContainer();

    const lifecycle =
      new LifecycleManager();

    const plugins =
      new PluginManager();

    const context =
      new ApplicationContext(
        container,
        lifecycle,
        plugins,
      );

    return new Runtime(
      context,
    );
  }

}