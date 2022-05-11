/* eslint-disable @typescript-eslint/ban-ts-comment */
import ObjectValidationError from "custom-error/ObjectValidationError";
import { errorLogger } from "errors/errorLogger";
import { IMiddleware, StatusCodes } from "shared-types";

const middlewareWithTryCatch = <T = IMiddleware>(
  middleware: T,
  failstatus?: StatusCodes
): T =>
  // @ts-expect-error
  (async (req, res, next) => {
    try {
      // @ts-expect-error
      await middleware(req, res, next);
    } catch (error) {
      if (error instanceof ObjectValidationError)
        res.status(StatusCodes.Unauthorized).send({
          message: error.message,
          stack: error.stack,
          fields: error.fields,
          name: error.name,
        });
      else if (error instanceof Error)
        res
          .status(StatusCodes["Bad Request"])
          .send({ message: error.message, stack: error.stack });
      else
        res.status(failstatus || StatusCodes["Internal Server Error"]).send({
          stack: error instanceof Error ? error.stack : "unknown",
          message: error instanceof Error ? error.message : "unknown",
        });
      errorLogger(req, error);
    }
  }) as T;

export default middlewareWithTryCatch;
