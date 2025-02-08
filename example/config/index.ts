import { PostgresDatabaseConfig } from "@dirty-matchbox/database";
import { Environment, ServiceConfig } from "../../types";

type ExampleServiceConfig = ServiceConfig & {
  databases: {
    example: PostgresDatabaseConfig;
  };
};

const config: ExampleServiceConfig = {
  name: process.env.NAME ?? "example-service",
  port: Number(process.env.PORT ?? 3000),
  environment: (process.env.ENVIRONMENT as Environment) ?? "development",
  logger: {
    environment: (process.env.ENVIRONMENT as Environment) ?? "development",
    name: process.env.NAME ?? "example-service",
  },
  databases: {
    example: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      name: "dirty_matchbox_example",
      password: "password",
      username: "dirty_matchbox_example_user",
    },
  },
};

export default config;
