import {
  Router,
  RouteRegistry,
} from './router/index.js';

import type {
  Middleware,
} from './middleware/index.js';

import {
  MiddlewarePipeline,
} from './middleware/index.js';

import {
  GatewayPluginManager,
} from './plugins/index.js';

import type {
  HttpAdapter,
} from './adapters/index.js';

import type {
  GatewayRequest,
  GatewayResponse,
} from './types/index.js';

import {
  GatewayError,
} from './errors/index.js';

import {
  GroupContext,
} from './router/index.js';

import {
  validateRequest,
} from './validation/index.js';

import {
  AuthenticationError,
  AuthorizationError,
} from './auth/index.js';

import {
  FixedWindowLimiter,
  MemoryRateLimitStore,
  RateLimitError,
} from './rate-limit/index.js';

import {
  SecurityMiddleware,
  CorsMiddleware,
  defaultSecurityConfig,
} from './security/index.js';

import {
  DefaultHealthProvider,
  HealthController,
} from './health/index.js';

import type {
  GatewayConfig,
} from './config/index.js';

import {
  defaultGatewayConfig,
} from './config/index.js';

import {
  InMemoryMetricsCollector,
  MetricsMiddleware,
} from './metrics/index.js';
import {
  LifecycleManager,
} from './lifecycle/index.js';

export class ApiGateway {
  readonly routes = new RouteRegistry();

  readonly router = new Router(
    this.routes,
  );

  readonly middleware =
    new MiddlewarePipeline();

  readonly plugins =
    new GatewayPluginManager();

    private readonly lifecycle =
  new LifecycleManager();

    private readonly metrics =
  new InMemoryMetricsCollector();

  private readonly health: HealthController;
  
    readonly rateLimiter =
  new FixedWindowLimiter(
    new MemoryRateLimitStore(),
  );
  private readonly security =
  defaultSecurityConfig;

  constructor(
  private readonly adapter: HttpAdapter,

  private readonly config: GatewayConfig =
    defaultGatewayConfig,
) {
  this.health =
    new HealthController(
      new DefaultHealthProvider(
        this.config.serviceName,
        this.config.version,
      ),
    );
}

  async initialize(): Promise<void> {
    await this.lifecycle.initialize();

    this.middleware.use(
  new SecurityMiddleware(),
);

this.middleware.use(
  new CorsMiddleware(
    this.security.cors!,
  ),
);
    this.plugins.load(
      this.routes,
      this.middleware,
    );
    this.middleware.use(
  new MetricsMiddleware(
    this.metrics,
  ),
);
this.routes.register({
  method: 'GET',
  path: '/health',
  handler:
    this.health.health.bind(
      this.health,
    ),
});

this.routes.register({
  method: 'GET',
  path: '/live',
  handler:
    this.health.live.bind(
      this.health,
    ),
});

this.routes.register({
  method: 'GET',
  path: '/ready',
  handler:
    this.health.ready.bind(
      this.health,
    ),
});
    this.adapter.onRequest(
      this.handleRequest.bind(this),
    );
  }

  group(
    prefix: string,
    callback: (
      group: GroupContext,
    ) => void,
  ): void {
    callback(
      new GroupContext(
        prefix,
        this.routes,
        this.middleware,
      ),
    );
  }

  use(
    middleware: Middleware,
  ): void {
    this.middleware.use(
      middleware,
    );
  }

  private async handleRequest(
    request: GatewayRequest,
    response: GatewayResponse,
  ): Promise<void> {
    try {
      const match =
        this.router.resolve(
          request,
        );

      if (!match) {
        throw new GatewayError(
          404,
          'Route not found',
        );
      }

      const routedRequest: GatewayRequest = {
        ...request,
        params: match.params,
      };

      validateRequest(
        routedRequest,
        match.route.schema,
      );

      if (match.route.rateLimit) {
  const result =
    await this.rateLimiter.limit(
      routedRequest,
      match.route.rateLimit,
    );

  response.header(
    'X-RateLimit-Remaining',
    result.remaining.toString(),
  );

  response.header(
    'X-RateLimit-Reset',
    result.resetAt.toISOString(),
  );

  if (!result.allowed) {
    throw new RateLimitError();
  }
}

      let finalRequest: GatewayRequest =
        routedRequest;

      if (match.route.auth) {
        const result =
          await match.route.auth.authenticate(
            routedRequest,
          );

        if (
          !result.authenticated ||
          !result.user
        ) {
          throw new AuthenticationError();
        }

        finalRequest = {
          ...routedRequest,
          user: result.user,
        };

        if (match.route.roles) {
          const allowed =
            match.route.roles.every(
              (role) =>
                result.user!.roles.includes(
                  role,
                ),
            );

          if (!allowed) {
            throw new AuthorizationError();
          }
        }

        if (
          match.route.permissions
        ) {
          const allowed =
            match.route.permissions.every(
              (
                permission,
              ) =>
                result.user!.permissions.includes(
                  permission,
                ),
            );

          if (!allowed) {
            throw new AuthorizationError();
          }
        }
      }

      await this.middleware.execute(
        finalRequest,
        response,
      );

      if (
        match.route.middleware
      ) {
        for (const middleware of match.route.middleware) {
          await middleware.handle(
            finalRequest,
            response,
            async () => {},
          );
        }
      }

      await match.route.handler(
        finalRequest,
        response,
      );
    } catch (error) {
      if (
        error instanceof GatewayError
      ) {
        response
          .status(error.status)
          .send({
            error: error.message,
          });

        return;
      }

      console.error(error);

      response
        .status(500)
        .send({
          error:
            'Internal Server Error',
        });
    }
  }

  async start(
    port = this.config.port
  ): Promise<void> {
    await this.lifecycle.start();
    await this.adapter.listen(
      port,
    );
  }

  async stop(): Promise<void> {
    await this.lifecycle.stop();
    await this.adapter.close();
  }
}