/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS, IToken, RequireOnlyOne } from "shared-types";

import { RoleType } from "../models/Role";

export interface ISignUpClassicBody {
  email: string;
  userName?: string;
  password: string;
}

export type ISignInClassicBody = RequireOnlyOne<
  ISignUpClassicBody,
  "email" | "userName"
>;

export interface AuthResponse {
  authID: string;
  token: IToken;
  role: RoleType;
  access: ACCESS[];
}

// TODO : Add to generator and docs
// TODO : Use it :)
//! TODO : code generation
export type AuthNRouteTypes = {
  "/n/sign-in/classic": {
    POST: {
      body: ISignInClassicBody;
      query: { role?: string };
      response: AuthResponse;
    };
  };
  "/n/classic": {
    POST: {
      body: ISignUpClassicBody;
      response: AuthResponse;
    };
  };
  "/n/facebook": {
    POST: {
      body: FacebookSignInBody;
      response: AuthResponse;
    };
  };
  "/n/apple": {
    POST: {
      body: AppleSignInBody;
      response: AuthResponse;
    };
  };
  "/n/refresh-token": {
    GET: {
      response: string;
    };
  };
  "/n/logout": {
    GET: {
      response: void;
    };
  };
  "/z/upload-token": {
    GET: {
      response: string;
      query: {
        mimeTypes: string[];
      };
    };
  };
  //! GENERATOR-ANCHOR
};

// Using Pick to throw an error in case a route changes
export type AuthResponseRoutes = keyof Pick<
  AuthNRouteTypes,
  "/n/apple" | "/n/classic" | "/n/facebook" | "/n/sign-in/classic"
>;

export type AppleSignInBody = {
  givenName: string;
  familyName: string;
  token: string;
};

export type FacebookSignInBody = {
  token: string;
};
export interface FacebookUserProfileResponse {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}
