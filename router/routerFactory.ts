import { Application } from "express";

const routerFactory = ({app}: {app: Application}) => {
  const create = ({
    path,
    middlewares,
  }: {
    path: string;
    middlewares: any[];
  }) => {
    return app.use(path, ...middlewares);
  };
  return { create };
};

export default routerFactory;
