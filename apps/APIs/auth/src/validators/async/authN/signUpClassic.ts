import { AuthNRouteTypes } from "auth-types/routes/authN";
import { ObjectValidationError } from "custom-error";
import { Request } from "http-server";
import Auth from "models/Auth";
import { IMiddleware } from "shared-types";

export const signUpClassicValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>
> = async (req, res, next) => {
  const { email, userName } = req.body;

  const authUsersByEmail = await Auth.findOne({ email });

  if (authUsersByEmail) {
    throw new ObjectValidationError({
      message: "Email already in use!",
      stack: "authentication validator auth",
      fields: [{ fieldName: "email", message: "email already in use!" }],
    });
  }
  if (!userName) return next();

  const authUsersByUserName = await Auth.findOne({ userName });

  if (authUsersByUserName) {
    throw new ObjectValidationError({
      message: "userName already in use!",
      stack: "authentication validator auth",
      fields: [{ fieldName: "userName", message: "userName already in use!" }],
    });
  }

  return next();
};
