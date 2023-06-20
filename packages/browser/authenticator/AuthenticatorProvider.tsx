import React, { PropsWithChildren } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "core-ui/Loader";
import ApiSDK from "server-sdk";
import { ACCESS } from "shared-types";

import { authIndexedDb, authSDKClass, localStorageClass } from "./api";
import { AuthProviderContext, useAuthProvider } from "./hooks/AuthContext";
import { GOOGLE_CLIENT_ID } from "./ThirdPartyIds";

interface IProps extends PropsWithChildren {
  mainApi: ApiSDK;
  /**
   * This should be the auth name in the localstorage
   * @example
   * "CLIENT"
   * "DASHBOARD"
   * "FOURNISSEUR"
   */
  authDomain: string;
  /**
   * this should be the minimum role required to accept the user
   * @example
   * "PUBLIC"
   * "ADMIN"
   * "SUPER_ADMIN"
   * "GOD"
   **/
  role?: string[];
  access?: ACCESS[];
  preventLoadingUntilInitiated?: boolean;
}

const AuthenticatorProvider: React.FC<IProps> = ({
  children,
  mainApi,
  authDomain,
  role,
  preventLoadingUntilInitiated,
  access,
}) => {
  const AUTH_DOMAIN = authDomain.toUpperCase();
  // TODO: HIDRATE

  authSDKClass.init(mainApi);
  authIndexedDb.init(AUTH_DOMAIN);
  localStorageClass.init(AUTH_DOMAIN);
  const authProviderContextValue = useAuthProvider(role, access);
  const shouldRenderChildren = preventLoadingUntilInitiated
    ? authProviderContextValue.isInitiated
    : true;

  return (
    <AuthProviderContext.Provider value={authProviderContextValue}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {shouldRenderChildren ? (
          children
        ) : (
          <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/30 text-center align-middle backdrop-blur-sm">
            <Loader />
          </div>
        )}
      </GoogleOAuthProvider>
    </AuthProviderContext.Provider>
  );
};

export default AuthenticatorProvider;
