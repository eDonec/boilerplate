// eslint-disable-next-line es-local-rules/no-import-express
import { Router, RouterOptions } from "express";
import { IRouter } from "express-serve-static-core";
import { IMiddleware } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import middlewareWithTryCatch from "./errors/middlewareWithTryCatch";

const CustomRouter =
  (eventSender: (payload: TCustomErrors) => void) =>
  (options?: RouterOptions | undefined) => {
    const thisRouter: IRouter = Router(options);

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

    return thisRouter;
  };

export default CustomRouter;
