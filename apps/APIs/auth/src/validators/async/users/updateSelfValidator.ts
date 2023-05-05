import { UserRouteTypes } from "auth-types/routes/user";
import { ObjectValidationError } from "custom-error";
import { Request, Response } from "http-server";
import User from "models/User";
import { IMiddleware } from "shared-types";
import { TCurrentAuthLocals } from "token";

export const updateSelfVaidator: IMiddleware<
  Request<unknown, unknown, UserRouteTypes["/user/me"]["PUT"]["body"]>,
  Response<unknown, TCurrentAuthLocals>
> = async (req, res, next) => {
  const { authId } = res.locals.token.decodedToken.payload;
  const { phoneNumber } = req.body;

  const userByPhoneNumber = await User.findOne({
    phoneNumber,
    auth: { $ne: authId },
  });

  if (userByPhoneNumber) {
    throw new ObjectValidationError({
      message: "Phone already in use!",
      stack: "authentication validator auth",
      fields: [
        {
          fieldName: "phoneNumber",
          message: "N° Téléphone indisponible",
        },
      ],
    });
  }

  return next();
};
