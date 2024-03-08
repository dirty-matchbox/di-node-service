import Service from "../index";
import config from "./config/index";

const service = new Service<ExampleInclusiveInjections>({ config });

service.registerControllers("./src/**/*.controller.ts", __dirname);

service.start();
