import { PostgresDatabaseInterface } from "../interfaces";

export {};
declare global {
  interface ExampleInclusiveInjections {
    exampleDatabase: PostgresDatabaseInterface;
  }

  type ExampleServiceInjections = ExampleInclusiveInjections &
    import("../index").ServiceInjections;
}
