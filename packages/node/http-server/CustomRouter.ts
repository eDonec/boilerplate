import { IRouter, Router, RouterOptions } from "express";
// import { Router } from "express-serve-static-core";
import { IMiddleware } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import middlewareWithTryCatch from "./errors/middlewareWithTryCatch";

type ExtraMethods = {
  getProtected: IRouter["get"];
};
export type TCustomRouter = Router & ExtraMethods;

type PartialTCustomRouter = Router & Partial<ExtraMethods>;

const CustomRouter =
  (eventSender: (payload: TCustomErrors) => void) =>
  (options?: RouterOptions | undefined) => {
    const thisRouter: PartialTCustomRouter = Router(options);

    const { get, put, post, delete: deleter, patch } = thisRouter;

    function HOFCustomMethod<
      Method extends <T, A, R>(this: T, ...args: A[]) => R
    >(method: Method) {
      return function customMethod(this: Method, ...args: Parameters<Method>) {
        const [path, ...middlewares] = args;

        const customMiddlewares = middlewares.map((middleware) =>
          middlewareWithTryCatch(middleware as IMiddleware, eventSender)
        );

        return method.apply(this, [path, ...customMiddlewares]);
      };
    }

    thisRouter.get = HOFCustomMethod(get) as typeof get;
    thisRouter.put = HOFCustomMethod(put) as typeof put;
    thisRouter.post = HOFCustomMethod(post) as typeof post;
    thisRouter.patch = HOFCustomMethod(patch) as typeof patch;
    thisRouter.delete = HOFCustomMethod(deleter) as typeof deleter;
    thisRouter.getProtected = HOFCustomMethod(get) as typeof get;

    return thisRouter as TCustomRouter;
  };

export default CustomRouter;
