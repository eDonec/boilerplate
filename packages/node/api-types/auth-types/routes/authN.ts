/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS, AUTH_PROVIDERS, IToken, RequireOnlyOne } from "shared-types";

import { RoleType } from "../models/Role";
import { UserType } from "../models/User";

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
  email?: string;
  isActivated: boolean;
  userName?: string;
  user: UserType;
  authProvider: AUTH_PROVIDERS[];
}
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
  "/n/google": {
    POST: {
      body: GoogleSignInBody;
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
  "/z/refresh-token": {
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
        mimeTypes: string | string[];
      };
    };
  };
  "/n/me": {
    GET: {
      response: AuthResponse;
    };
  };
  "/n/update-password": {
    PUT: {
      body: {
        password: string;
        newPassword: string;
      };
      response: string;
    };
  };
  "/n/reset-password": {
    PUT: {
      body: {
        emailOrUsername: string;
      };

      response: string;
    };
  };
  "/n/reset-password-confirm": {
    PUT: {
      body: {
        newPassword: string;
      };
      query: {
        token: string;
      };
      response: string;
    };
  };
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
export type GoogleSignInBody = {
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
