import { Request, Response } from "express";
import { AuthDocument } from "models/Auth/types";
import { IMiddleware } from "shared-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAuthServerMiddleware<R = Request, Body = any, B = any> = IMiddleware<
  R,
  Response<Body, { currentAuth: AuthDocument }>,
  B
>;

export default IAuthServerMiddleware;
