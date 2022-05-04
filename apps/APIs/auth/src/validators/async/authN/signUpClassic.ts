import { AuthNRouteTypes } from "auth-types/routes/authN";
import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
import StatusCodes from "shared-types/StatusCodes";

export const signUpClassicValidator: IMiddleware = async (req, res, next) => {
  const { email, userName }: AuthNRouteTypes["/n/classic"]["POST"]["body"] =
    req.body;
  const authUsersByEmail = await Auth.findOne({ email });

  if (authUsersByEmail) {
    res.status(StatusCodes.Unauthorized).send({
      message: "Email already in use!",
      stack: "authentication validator auth",
      fields: ["email"],
    });

    return;
  }
  if (!userName) return next();

  const authUsersByUserName = await Auth.findOne({ userName });

  if (authUsersByUserName) {
    res.status(StatusCodes.Unauthorized).send({
      message: "Email already in use!",
      stack: "authentication validator auth",
      fields: ["userName"],
    });

    return;
  }

  return next();
};
