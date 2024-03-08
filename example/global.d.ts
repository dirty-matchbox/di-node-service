export {};
declare global {
  interface ExampleInclusiveInjections {}

  type ExampleServiceInjections = ExampleInclusiveInjections &
    import("../index").ServiceInjections;
}
