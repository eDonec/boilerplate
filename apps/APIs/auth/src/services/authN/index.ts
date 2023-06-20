/* eslint-disable max-lines */
import { AuthDocument } from "auth-types/models/Auth";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { NotFoundError } from "custom-error";
import producer from "events/producer";
import Auth from "models/Auth";
import Role from "models/Role";
import User from "models/User";
import { ACCESS_RESSOURCES, ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";
import { TokenValidator } from "token";
import TokenGenerator from "token/TokenGenerator";

import { PUBLIC_ROLE } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

import { generateAuthResponse } from "./helpers";

export const signUpClassic = async ({
  email,
  password,
  userName,
}: AuthNRouteTypes["/n/classic"]["POST"]["body"]): Promise<
  Omit<AuthNRouteTypes["/n/classic"]["POST"]["response"], "user">
> => {
  const publicRole = await Role.findOne({ name: PUBLIC_ROLE.name });

  if (!publicRole)
    throw new Error("Public role not found please seed the database!");
  const newAuthClient = new Auth({
    email,
    password,
    userName,
    role: publicRole,
    authType: ACCESS_TYPE.USER,
    authProvider: [AUTH_PROVIDERS.CLASSIC],
  });

  await newAuthClient.save();

  producer.emit.UserCreated({
    email,
    userName: newAuthClient.userName,
    role: publicRole.name,
    authType: newAuthClient.authType,
    authProvider: newAuthClient.authProvider,
  });

  return generateAuthResponse(newAuthClient);
};

export const signInClassic = async (
  authClient: AuthDocument
): Promise<AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]> => {
  const maybeUser = await User.findOne({ auth: authClient._id });

  if (!maybeUser) {
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });
  }
  const authResponse = await generateAuthResponse(authClient);

  return {
    ...authResponse,
    user: maybeUser,
  };
};

export * from "./thirdParty";

export const getAuthByAccessToken = async (
  currentAuth: AuthDocument,
  accessToken: string
): Promise<AuthNRouteTypes["/n/me"]["GET"]["response"]> => {
  const maybeUser = await User.findOne({ auth: currentAuth._id });

  if (!maybeUser) {
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });
  }

  return {
    authID: currentAuth.id,
    token: {
      accessToken,
      refreshToken: "",
    },
    role: currentAuth.role,
    email: currentAuth.email,
    userName: currentAuth.userName,
    access: constructRoleArray(currentAuth.role, currentAuth.customAccessList),
    authProvider: currentAuth.authProvider,
    isActivated: currentAuth.isActivated,
    user: maybeUser,
  };
};

export const updatePassword = async (
  authClient: AuthDocument,
  newPassword: string
) => {
  authClient.password = newPassword;
  await authClient.save();
};

export const resetPassword = async (
  emailOrUsername: string,
  browser: string | null,
  os: string | null,
  country: string | null
) => {
  if (!process.env.RESET_PASSWORD_SECRET)
    throw new Error("Missing env variable RESET_PASSWORD_SECRET");

  if (!process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN)
    throw new Error("Missing env variable RESET_PASSWORD_TOKEN_EXPIRES_IN");

  const maybeAuth = await Auth.findOne({
    $or: [
      { $and: [{ email: { $exists: true } }, { email: emailOrUsername }] },
      {
        $and: [{ userName: { $exists: true } }, { userName: emailOrUsername }],
      },
    ],
  });

  if (!maybeAuth || !maybeAuth.email) {
    throw new NotFoundError({
      message: "No user was found with these credentials",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });
  }
  const user = await User.findOne({ auth: maybeAuth._id });

  const { token: resetPasswordToken } = new TokenGenerator(
    {
      payload: {
        authId: maybeAuth.id,
      },
      aud: "auth",
      iss: "auth",
      sid: "none",
    },
    false,
    process.env.RESET_PASSWORD_SECRET,
    process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN
  );

  producer.emit.ResetPasswordRequest({
    resetPasswordToken,
    email: maybeAuth.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    browser,
    os,
    country,
  });
};

export const resetPasswordConfirm = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  if (!process.env.RESET_PASSWORD_SECRET)
    throw new Error("Missing env variable RESET_PASSWORD_SECRET");

  const {
    decodedToken: {
      payload: { authId },
    },
  } = new TokenValidator<{ authId: string }>(
    resetPasswordToken,
    false,
    process.env.RESET_PASSWORD_SECRET
  );

  const maybeAuth = await Auth.findByIdAndUpdate(
    authId,
    {
      password: newPassword,
    },
    { new: true }
  ).lean();

  if (!maybeAuth) {
    throw new NotFoundError({
      message: "No user was found with these credentials",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });
  }
};
