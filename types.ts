import { type LoggerConfig } from "@dirty-matchbox/logger"
import { type DatabaseConfig } from "@dirty-matchbox/database"

export type Environment = "development" | "production" | "staging" | "test";

export type ServiceConfig = {
  name: string;
  environment: Environment;
  port: number;
  databases?: { [key: string]: DatabaseConfig };
  logger: LoggerConfig;
};
