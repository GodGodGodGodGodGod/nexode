import type {
  GatewayRequest,
  GatewayResponse,
} from '../types/index.js';

import type {
  Middleware,
  NextFunction,
} from './middleware.js';

export class MiddlewarePipeline {
  private readonly middleware: Middleware[] = [];

  use(middleware: Middleware): void {
    this.middleware.push(middleware);
  }

  async execute(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {
    let index = -1;

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error('next() called multiple times.');
      }

      index = i;

      const current = this.middleware[i];

      if (!current) {
        return;
      }

      const next: NextFunction = () => dispatch(i + 1);

      await current.handle(
        request,
        response,
        next,
      );
    };

    await dispatch(0);
  }

  getMiddleware(): readonly Middleware[] {
    return this.middleware;
  }
}