import * as express from "express";
import { loadControllers } from "awilix-express";
import { NameAndRegistrationPair, asClass, asValue, createContainer } from "awilix";
import { ServiceConfig } from "./types";
import Logger from "@dirty-matchbox/logger";
import {
  addPostgresDatabaseFactoryToContainer,
  PostgresDatabaseConfig,
  PostgresDatabaseFactory,
} from "@dirty-matchbox/database";

type ServiceInjections = {
  config: ServiceConfig;
  postgresDatabaseFactory: PostgresDatabaseFactory;
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

    this.app.use(express.json());
    addPostgresDatabaseFactoryToContainer({ container: this.container });
  }

  registerControllers = (path: string, root: string) => {
    this.app.use(loadControllers(path, { cwd: root }));
  };

  register = this.container.register;

  createPostgresDatabase = ({config}: {config: PostgresDatabaseConfig}) => {
    this.container.cradle.postgresDatabaseFactory.register;
  }

  start = () => {
    this.app.listen(this.config.port, () => {
      this.container.cradle.logger.info("Server is running on port " + this.config.port);
    });
    return this.container;
  };
}

export { type PostgresDatabase } from "@dirty-matchbox/database";
export * from "./types";
export * from "awilix";
export { ServiceInjections };

export default Service;
