/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IMiddleware } from "shared-types";

import { AuthDocument } from "./models/Auth";

type IAuthServerMiddleware<
  R = Request,
  Locals = { currentAuth: AuthDocument },
  Body = any,
  B = any
> = IMiddleware<R, Response<Body, Locals>, B>;

export default IAuthServerMiddleware;
