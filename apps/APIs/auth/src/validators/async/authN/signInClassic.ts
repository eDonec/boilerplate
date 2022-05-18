import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { compareSync } from "bcrypt";
import { ObjectValidationError, UnauthorizedError } from "custom-error";
import add from "date-fns/add";
import isAfter from "date-fns/isAfter";
import Auth from "models/Auth";
import * as authZServices from "services/authZ";
import { AUTH_PROVIDERS, IMiddleware } from "shared-types";

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
    throw new ObjectValidationError({
      message: "No user was found with these credentials",
      stack: "authentication validator auth",
      fields: [
        { fieldName: "email", message: "email not found!" },
        { fieldName: "userName", message: "If provided, username not found!" },
      ],
    });
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
      throw new UnauthorizedError({
        message: `User is suspended untill ${
          currentAuth.suspentionLiftTime
        } for ${currentAuth.suspentionReason || "an unknown reason"}`,
        reason: "User suspended",
      });
    }
    currentAuth.isSuspended = false;
    await currentAuth.save();
  }
  next();
};

export const checkBanned: IAuthServerMiddleware = async (_req, res, next) => {
  const { currentAuth } = res.locals;

  if (currentAuth.isBanned) {
    throw new UnauthorizedError({
      message: "User is banned indefinitely!",
      reason: "User banned",
    });
  }
  next();
};

export const checkAuthProvider: (
  authProvide: AUTH_PROVIDERS
) => IAuthServerMiddleware = (authProvider) => (_req, res, next) => {
  const { currentAuth } = res.locals;

  if (!currentAuth.authProvider.includes(authProvider)) {
    throw new UnauthorizedError({
      message: `User has never signed up with classic method you can use ${currentAuth.authProvider.join(
        " or "
      )} to login to your account`,
      reason: "No classic signup found",
    });
  }
  next();
};
export const checkPassword: IAuthServerMiddleware = async (req, res, next) => {
  const { currentAuth } = res.locals;
  const { password } = req.body;

  if (currentAuth.password && !compareSync(password, currentAuth.password)) {
    // defer the next process to the next event loop cicle to avoid blocking the request
    // and answering the client ASAP
    process.nextTick(async () => {
      if (
        isAfter(add(currentAuth.lastTrialSince, { minutes: 10 }), new Date())
      ) {
        currentAuth.numberOfUnsuccessfulTrials += 1;
        if (
          currentAuth.numberOfUnsuccessfulTrials >
          Number(process.env.NUMBER_OF_AUTH_TRIALS)
        ) {
          await authZServices.suspendClient(currentAuth, {
            suspentionLiftTime: add(new Date(), { minutes: 10 }),
            suspentionReason: "Too many unsuccessful trials",
          });
        }
      } else currentAuth.numberOfUnsuccessfulTrials = 1;
      currentAuth.lastTrialSince = new Date();
      await currentAuth.save();
    });
    // anser the client here
    throw new UnauthorizedError({
      message: `Password incorrect`,
      reason: "authentication validator auth",
    });
  }

  next();
};
