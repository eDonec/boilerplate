import { IRouter, Router, RouterOptions } from "express";
// import { Router } from "express-serve-static-core";
import { ACCESS_RESSOURCES, IMiddleware, PRIVILEGE } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import middlewareWithTryCatch from "./errors/middlewareWithTryCatch";
import { tokenValidator } from "./middlewares/authN";
import { routeProtection } from "./middlewares/routeProtection";

type ExtraMethods = {
  getProtected: (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE
  ) => IRouter["get"];
  putProtected: (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE
  ) => IRouter["get"];
  postProtected: (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE
  ) => IRouter["get"];
  patchProtected: (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE
  ) => IRouter["get"];
  deleteProtected: (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE
  ) => IRouter["get"];
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
    >(method: Method, ressource?: ACCESS_RESSOURCES, privilege?: PRIVILEGE) {
      return function customMethod(this: Method, ...args: Parameters<Method>) {
        const [path, ...middlewares] = args;

        if (ressource && privilege) {
          middlewares.unshift(routeProtection(ressource, privilege));
          middlewares.unshift(tokenValidator());
        }
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
    thisRouter.getProtected = (
      ressource: ACCESS_RESSOURCES,
      privilege: PRIVILEGE
    ) =>
      // @ts-expect-error type mismatch still works though
      HOFCustomMethod(get, ressource, privilege).bind(thisRouter) as typeof get;
    thisRouter.putProtected = (
      ressource: ACCESS_RESSOURCES,
      privilege: PRIVILEGE
    ) =>
      // @ts-expect-error type mismatch still works though
      HOFCustomMethod(put, ressource, privilege).bind(thisRouter) as typeof put;
    thisRouter.postProtected = (
      ressource: ACCESS_RESSOURCES,
      privilege: PRIVILEGE
    ) =>
      // @ts-expect-error type mismatch still works though
      HOFCustomMethod(post, ressource, privilege).bind(
        thisRouter
      ) as typeof post;
    thisRouter.patchProtected = (
      ressource: ACCESS_RESSOURCES,
      privilege: PRIVILEGE
    ) =>
      // @ts-expect-error type mismatch still works though
      HOFCustomMethod(patch, ressource, privilege).bind(
        thisRouter
      ) as typeof patch;
    thisRouter.deleteProtected = (
      ressource: ACCESS_RESSOURCES,
      privilege: PRIVILEGE
    ) =>
      // @ts-expect-error type mismatch still works though
      HOFCustomMethod(deleter, ressource, privilege).bind(
        thisRouter
      ) as typeof deleter;

    return thisRouter as TCustomRouter;
  };

export default CustomRouter;
