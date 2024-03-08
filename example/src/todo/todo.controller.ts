import { GET, route } from "awilix-express";
import { Request, Response } from "express";

@route("/todos")
export class TodosController {
  @GET()
  getHelloTodos(req: Request, res: Response) {
    return res.json({ data: [{ id: "1", title: "To do number 1" }] });
  }
}
