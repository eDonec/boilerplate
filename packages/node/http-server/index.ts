import express, {
  Express,
  NextFunction,
  Request,
  Response,
  RouterOptions,
} from "express";
import TCustomErrors from "shared-types/Errors";

import CustomRouter, { TCustomRouter } from "./CustomRouter";

class Server {
  app: Express;

  baseUrl = `/api/v1/${process.env.MICROSERVICE_NAME}`;

  use: Express["use"];

  listen: Express["listen"];

  Router: (options?: RouterOptions | undefined) => TCustomRouter;

  constructor(eventEmitter: (payload: TCustomErrors) => void) {
    this.app = express();
    this.app.get(`${this.baseUrl}/health`, (_, res) => {
      res.send({
        uptime: process.uptime(),
        health: "OK",
        microServiceName: process.env.MICROSERVICE_NAME,
        currentTime: new Date().toISOString(),
      });
    });

    this.use = this.app.use.bind(this.app);
    this.listen = this.app.listen.bind(this.app);
    this.Router = CustomRouter(eventEmitter);
  }
}

export default Server;

export type { NextFunction, Request, Response };
