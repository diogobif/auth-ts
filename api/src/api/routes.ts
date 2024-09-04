import { Express, Request, Response } from "express";
import { userRouter, sessionRouter } from "../api/router";

export default function (app: Express) {
  app.get("/ping", (req: Request, res: Response) => res.sendStatus(200));

  userRouter(app);

  sessionRouter(app);
}
