import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IMiddleware<T = Request, B = any> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<B> | void;
