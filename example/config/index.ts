import { Environment, ServiceConfig } from "../../types";

type ExampleServiceConfig = ServiceConfig & {};

const config: ExampleServiceConfig = {
  name: process.env.NAME ?? "example-service",
  port: Number(process.env.PORT ?? 3000),
  environment: (process.env.ENVIRONMENT as Environment) ?? "development",
  logger: {
    environment: (process.env.ENVIRONMENT as Environment) ?? "development",
    name: process.env.NAME ?? "example-service",
  },
};

export default config;
