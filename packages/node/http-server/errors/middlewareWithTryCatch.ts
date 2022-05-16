/* eslint-disable @typescript-eslint/ban-ts-comment */
import ObjectValidationError from "custom-error/ObjectValidationError";
import UnauthorizedError from "custom-error/UnauthorizedError";
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
      if (error instanceof ObjectValidationError)
        return sendEventAndResponse(req, res, eventSender)
          .status("Bad Request")
          .send({
            message: error.message,
            stack: error.stack,
            fields: error.fields,
            name: error.name,
          });
      if (error instanceof UnauthorizedError)
        return sendEventAndResponse(req, res, eventSender)
          .status("Forbidden")
          .send({
            message: error.message,
            stack: error.stack,
            reason: error.reason,
            ressource: error.ressource,
            requiredRole: error.requiredRole,
          });

      return sendEventAndResponse(req, res, eventSender)
        .status("Internal Server Error")
        .send({
          stack: error instanceof Error ? error.stack : "unknown",
          message: error instanceof Error ? error.message : "unknown",
        });
    }
  }) as T;

export default middlewareWithTryCatch;

const sendEventAndResponse = (
  req: Parameters<IMiddleware>[0],
  res: Parameters<IMiddleware>[1],
  evenSender: (payload: TCustomErrors) => void
) => ({
  status: (status: keyof typeof StatusCodes) => ({
    send: (body: TCustomErrors) => {
      res.status(StatusCodes[status]).send(body);
      evenSender(body);
      errorLogger(req, body);
    },
  }),
});
