import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router as ExpressRouter,
  RouterOptions,
} from "express";
import TCustomErrors from "shared-types/Errors";

import CustomRouter from "./CustomRouter";

class Server {
  app: Express;

  use: Express["use"];

  listen: Express["listen"];

  Router: (options?: RouterOptions | undefined) => ExpressRouter;

  constructor(eventEmitter: (payload: TCustomErrors) => void) {
    this.app = express();
    this.use = this.app.use.bind(this.app);
    this.listen = this.app.listen.bind(this.app);
    this.Router = CustomRouter(eventEmitter);
  }
}

export default Server;

export type { NextFunction, Request, Response };
