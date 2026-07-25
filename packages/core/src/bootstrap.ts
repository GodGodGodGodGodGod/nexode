import {
  setContainer,
} from './container.js';

import {
  DefaultContainer,
} from './providers/default/index.js';


export async function bootstrap(): Promise<void> {

  const container =
    new DefaultContainer();


  setContainer(
    container,
  );
}