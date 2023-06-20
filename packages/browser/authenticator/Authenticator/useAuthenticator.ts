import { useState } from "react";

import { AuthResponse } from "auth-types/routes/authN";
import { isApiError } from "server-sdk";
import { AUTH_PROVIDERS } from "shared-types";

import LocalAuthApi from "../api";
import { ISignInForm } from "../components/EmailAndPasswordSignIn/useEmailAndPasswordSignIn";
import { ISignUpForm } from "../components/EmailAndPasswordSignUp/useEmailAndPasswordSignUp";
import { useHandlePostSignInData } from "../hooks/useHandlePostSignInData";

export const useAuthenticator = ({
  onSuccessfullLogin,
}: {
  onSuccessfullLogin?: () => void;
} = {}) => {
  const [hasError, setError] = useState(false);
  const handlePostSignInData = useHandlePostSignInData();

  const handleAuthentication =
    <T extends AUTH_PROVIDERS | "SIGN_UP">(authProvider: T) =>
    async (
      body: T extends AUTH_PROVIDERS.CLASSIC
        ? ISignInForm
        : T extends "SIGN_UP"
        ? ISignUpForm
        : string
    ) => {
      let authResponse: AuthResponse | undefined;

      setError(false);
      try {
        switch (authProvider) {
          case "SIGN_UP":
            authResponse = await LocalAuthApi.authSDK.signUpClassic({
              body: body as ISignUpForm,
            });
            break;
          case AUTH_PROVIDERS.CLASSIC:
            authResponse = await LocalAuthApi.authSDK.signInClassic({
              body: body as ISignInForm,
            });
            break;
          case AUTH_PROVIDERS.FACEBOOK:
            authResponse = await LocalAuthApi.authSDK.facebookSignIn({
              body: { token: body as string },
            });
            break;
          case AUTH_PROVIDERS.GOOGLE:
            authResponse = await LocalAuthApi.authSDK.googleSignIn({
              body: { token: body as string },
            });
            break;
          default:
            throw new Error("Unkown provider");
        }
        await handlePostSignInData(authResponse);
        onSuccessfullLogin?.();
      } catch (error) {
        setError(true);
        if (isApiError(error) && authProvider === AUTH_PROVIDERS.CLASSIC) {
          // these errors should be handled in the form
          throw error;
        }
      }
    };

  const handleFacebookSignInFailure = async () => {
    setError(true);
  };
  const handleGoogleSingInFailure = async () => {
    setError(true);
  };
  const handleLogout = async () => {
    await LocalAuthApi.authSDK?.logout();
  };

  return {
    handleAuthentication,
    handleFacebookSignInFailure,
    handleLogout,
    handleGoogleSingInFailure,
    hasError,
  };
};
