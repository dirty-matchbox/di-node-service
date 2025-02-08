import Service from "../index";
import config from "./config/index";

const service = new Service<ExampleInclusiveInjections>({ config });

service.registerControllers("./src/**/*.controller.ts", __dirname);

service.register(
  "exampleDatabase",
  service.createPostgresDatabase({
    config: config.databases.example,
  })
);

service.start(async ({ logger, exampleDatabase }) => {
  logger.info("Service is running, and this is message from the callback");
  logger.info("Checking database connection:");
  try {
    await exampleDatabase.init();
    await exampleDatabase.healthCheck();
    await exampleDatabase.disconnect();
  } catch (error) {
    logger.error("Database connection failed");
    logger.error(error);
  }
});
