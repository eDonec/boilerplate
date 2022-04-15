import { Request } from "express";
import ErrorDocument from "models/ErrorDocument";

export const errorLogger = async (
  req: Request<unknown, unknown, unknown, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: Error | any
) =>
  ErrorDocument.create({
    error: { errorName: err.name, message: err?.message, stack: err?.stack },
    request: {
      path: req.path,
      headers: req.headers,
      cookies: req.cookies,
      query: req.query,
      params: req.params,
      body: req.body,
      protocol: req.protocol,
      route: req.route,
      xhr: req.xhr,
      ip: req.ip,
      method: req.method,
      hostname: req.hostname,
    },
  });
