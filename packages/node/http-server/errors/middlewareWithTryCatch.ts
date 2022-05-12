/* eslint-disable @typescript-eslint/ban-ts-comment */
import ObjectValidationError from "custom-error/ObjectValidationError";
import { IMiddleware, StatusCodes } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import { errorLogger } from "./errorLogger";

const middlewareWithTryCatch = <T extends IMiddleware>(
  middleware: T,
  eventSender: (payload: TCustomErrors) => void
): T =>
  (async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      if (error instanceof ObjectValidationError) {
        res.status(StatusCodes.Unauthorized).send({
          message: error.message,
          stack: error.stack,
          fields: error.fields,
          name: error.name,
        });
        eventSender({
          message: error.message,
          stack: error.stack,
          fields: error.fields,
          name: error.name,
        });
      } else {
        res.status(StatusCodes["Internal Server Error"]).send({
          stack: error instanceof Error ? error.stack : "unknown",
          message: error instanceof Error ? error.message : "unknown",
        });
        eventSender({
          stack: error instanceof Error ? error.stack : "unknown",
          message: error instanceof Error ? error.message : "unknown",
        });
      }
      errorLogger(req, error);
    }
  }) as T;

export default middlewareWithTryCatch;
