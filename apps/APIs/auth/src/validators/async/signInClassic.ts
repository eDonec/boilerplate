import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { compareSync } from "bcrypt";
import add from "date-fns/add";
import isAfter from "date-fns/isAfter";
import Auth from "models/Auth";
import * as authNServices from "services/authN";
import { AUTH_PROVIDERS, IMiddleware } from "shared-types";
import StatusCodes from "shared-types/StatusCodes";

export const signInClassicValidator: IMiddleware = async (req, res, next) => {
  const {
    email,
    userName,
  }: AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"] = req.body;
  const authUsersByUserNameOrEmail = await Auth.findOne(
    userName
      ? {
          $or: [{ email }, { userName }],
        }
      : { email }
  ).populate("role");

  if (authUsersByUserNameOrEmail == null) {
    res.status(StatusCodes.Unauthorized).send({
      message: "No user was found with these credentials",
      stack: "authentication validator auth",
      fields: ["email", "userName"],
    });

    return;
  }
  res.locals.currentAuth = authUsersByUserNameOrEmail;
  next();
};
export const checkSuspension: IAuthServerMiddleware = async (
  _req,
  res,
  next
) => {
  const { currentAuth } = res.locals;

  if (currentAuth.isSuspended) {
    if (currentAuth.suspentionLiftTime > new Date()) {
      res.status(StatusCodes.Unauthorized).send({
        message: `User is suspended untill ${
          currentAuth.suspentionLiftTime
        } for ${currentAuth.suspentionReason || "an unknown reason"}`,
        stack: "authentication validator auth",
      });

      return;
    }
    currentAuth.isSuspended = false;
    await currentAuth.save();
  }
  next();
};

export const checkBanned: IAuthServerMiddleware = async (_req, res, next) => {
  const { currentAuth } = res.locals;

  if (currentAuth.isBanned) {
    res.status(StatusCodes.Unauthorized).send({
      message: "User is banned",
      stack: "authentication validator auth",
    });

    return;
  }
  next();
};

export const checkAuthProvider: (
  authProvide: AUTH_PROVIDERS
) => IAuthServerMiddleware = (authProvider) => (_req, res, next) => {
  const { currentAuth } = res.locals;

  if (!currentAuth.authProvider.includes(authProvider)) {
    res.status(StatusCodes.Unauthorized).send({
      message: `User has never signed up with classic method you can use ${currentAuth.authProvider.join(
        " or "
      )} to login to your account`,
      stack: "authentication validator auth",
    });

    return;
  }
  next();
};
export const checkPassword: IAuthServerMiddleware = async (req, res, next) => {
  const { currentAuth } = res.locals;
  const { password } = req.body;

  if (currentAuth.password && !compareSync(password, currentAuth.password)) {
    res.status(StatusCodes.Unauthorized).send({
      message: `Password incorrect`,
      stack: "authentication validator auth",
    });
    if (isAfter(add(currentAuth.lastTrialSince, { minutes: 10 }), new Date())) {
      currentAuth.numberOfUnsuccessfulTrials += 1;
      if (
        currentAuth.numberOfUnsuccessfulTrials >
        Number(process.env.NUMBER_OF_AUTH_TRIALS)
      ) {
        await authNServices.suspendClient(currentAuth, {
          suspentionLiftTime: add(new Date(), { minutes: 10 }),
          suspentionReason: "Too many unsuccessful trials",
        });
      }
    } else currentAuth.numberOfUnsuccessfulTrials = 1;
    currentAuth.lastTrialSince = new Date();
    await currentAuth.save();

    return;
  }

  next();
};
