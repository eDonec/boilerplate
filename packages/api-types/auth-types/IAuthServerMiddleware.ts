/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IMiddleware } from "shared-types";

import { AuthDocument } from "./models/Auth";

type IAuthServerMiddleware<
  R = Request,
  Body = unknown,
  Locals = unknown,
  B = void
> = IMiddleware<
  R,
  Response<
    Body | { message: string; stack: string | undefined },
    Locals & { currentAuth: AuthDocument }
  >,
  B
>;

export default IAuthServerMiddleware;
