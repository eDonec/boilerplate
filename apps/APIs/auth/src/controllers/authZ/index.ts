import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { Request } from "http-server";
import { StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (_, res) => {
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
};

export const getUploadToken: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    AuthNRouteTypes["/z/upload-token"]["GET"]["query"]
  >,
  AuthNRouteTypes["/z/upload-token"]["GET"]["response"]
> = (req, res) => {
  const uploadToken = new TokenGenerator(
    {
      aud: "bucket",
      iss: "auth",
      sid: "none",
      payload: {
        mimeTypes: req.query.mimeTypes,
      },
    },
    false,
    process.env.UPLOAD_SECRET_KEY,
    process.env.UPLOAD_TOKEN_EXPIRES_IN
  );

  res.status(StatusCodes.Created).send(uploadToken.token);
};
