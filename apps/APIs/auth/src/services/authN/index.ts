/* eslint-disable max-lines */
import { AuthDocument } from "auth-types/models/Auth";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import producer from "events/producer";
import Auth from "models/Auth";
import Role from "models/Role";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

import { PUBLIC_ROLE } from "constants/defaultRoles";

import { generateAuthResponse } from "./helpers";

export const signUpClassic = async ({
  email,
  password,
  userName,
}: AuthNRouteTypes["/n/classic"]["POST"]["body"]): Promise<
  AuthNRouteTypes["/n/classic"]["POST"]["response"]
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
): Promise<AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]> =>
  generateAuthResponse(authClient);

export * from "./thirdParty";
