import * as express from "express";
import { loadControllers, scopePerRequest } from "awilix-express";
import {
  NameAndRegistrationPair,
  asClass,
  asFunction,
  asValue,
  Resolver,
  createContainer,
} from "awilix";
import { ServiceConfig } from "./types";
import Logger from "@dirty-matchbox/logger";
import {
  addPostgresDatabaseFactoryToContainer,
  PostgresDatabaseConfig,
  PostgresDatabaseFactory,
} from "@dirty-matchbox/database";
import routerFactory from "./router/routerFactory";

type ServiceInjections = {
  config: ServiceConfig;
  postgresDatabaseFactory: ReturnType<PostgresDatabaseFactory>;
  routerFactory: ReturnType<typeof import("./router/routerFactory").default>;
  logger: Logger;
};

class Service<InclusiveInjections, InclusiveConfig = unknown> {
  container = createContainer<ServiceInjections & InclusiveInjections>({
    injectionMode: "PROXY",
  });

  config: ServiceConfig & InclusiveConfig;

  app: express.Application = express();

  constructor({ config }: { config: ServiceConfig & InclusiveConfig }) {
    this.config = config;
    this.container.register({
      config: asValue(config),
      logger: asClass(Logger).singleton(),
    } as NameAndRegistrationPair<ServiceInjections & InclusiveInjections>);

    this.container.register("routerFactory", asFunction(routerFactory).singleton());

    this.app.use(express.json());

    this.app.use(scopePerRequest(this.container));

    // Factories for creating different database connections
    addPostgresDatabaseFactoryToContainer({ container: this.container });
  }

  registerControllers = (path: string, root: string) => {
    this.app.use(loadControllers(path, { cwd: root }));
  };

  register = (
    name: Extract<keyof InclusiveInjections, string>,
    registration: Resolver<unknown>
  ) => this.container.register(name, registration);

  registerByPatterns = (patterns: string[]): void => {
    this.container.loadModules(patterns);
  };

  createPostgresDatabase = ({ config }: { config: PostgresDatabaseConfig }) => {
    return asFunction(
      this.container.cradle.postgresDatabaseFactory.create({ config })
    ).singleton();
  };

  start = (callback?: (injections: typeof this.container.cradle) => void) => {
    this.app.listen(this.config.port, () => {
      this.container.cradle.logger.info(
        "Server is running on port " + this.config.port
      );
    });
    callback?.(this.container.cradle);
    return this.container;
  };
}

export { type PostgresDatabase } from "@dirty-matchbox/database";
export * from "./types";
export * from "awilix";
export { ServiceInjections };

export default Service;
