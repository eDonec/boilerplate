import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IMiddleware<T = Request, R = Response, B = any> = (
  req: T,
  res: R,
  next: NextFunction
) => Promise<B> | void;
