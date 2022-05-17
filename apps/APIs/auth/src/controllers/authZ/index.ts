import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import middlewareWithTryCatch from "errors/middlewareWithTryCatch";
import { Request } from "express";
import { StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = middlewareWithTryCatch(async (_, res) => {
  const { currentAuth, refreshToken } = res.locals;

  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "auth",
    sid: refreshToken.decodedToken.sid,
    payload: {
      authId: currentAuth.id,
    },
  });

  res.status(StatusCodes.Created).send(accessToken.token);
}, StatusCodes["Bad Request"]);

export const getUploadToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/z/upload-token"]["GET"]["response"]
> = (_, res) => {
  const uploadToken = new TokenGenerator(
    {
      aud: "bucket",
      iss: "auth",
      sid: "none",
      payload: {
        maxFiles: 5,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
      },
    },
    false,
    process.env.UPLOAD_SECRET_KEY
  );

  res.status(StatusCodes.Created).send(uploadToken.token);
};
