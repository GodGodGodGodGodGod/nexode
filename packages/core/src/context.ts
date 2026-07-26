import type {
  ApplicationContext,
} from './context/index.js';


let currentContext:
  ApplicationContext | undefined;


export function setContext(
  context: ApplicationContext,
): void {
  currentContext = context;
}


export function getContext():
ApplicationContext {

  if (!currentContext) {
    throw new Error(
      'Application context not initialized',
    );
  }

  return currentContext;
}