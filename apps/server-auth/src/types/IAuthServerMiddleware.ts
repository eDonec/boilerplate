/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { AuthDocument } from "models/Auth/types";
import { IMiddleware } from "shared-types";

type IAuthServerMiddleware<
  R = Request,
  Locals = any,
  Body = any,
  B = any
> = IMiddleware<R, Response<Body, { currentAuth: AuthDocument } | Locals>, B>;

export default IAuthServerMiddleware;
