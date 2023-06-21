import { useState } from "react";

import { AUTH_PROVIDERS } from "shared-types";

import { useAuthenticator } from "./useAuthenticator";
import EmailAndPasswordSignIn from "../components/EmailAndPasswordSignIn";
import EmailAndPasswordSignUp from "../components/EmailAndPasswordSignUp";
import FacebookButton from "../components/Facebook";
import GoogleButton from "../components/Google";

export interface IProps {
  loginButtonText?: string;
  signUpButtonText?: string;
  facebookText?: string;
  googleText?: "signin_with" | "signup_with" | "continue_with" | "signin";
  seperatorText?: string;
  errorText?: React.ReactNode;
  onSuccessfullLogin?: () => void;
  onResetPassowordRequestSuccess?: () => void;
}
const Authenticator: React.FC<IProps> = ({
  loginButtonText = "Se connecter",
  signUpButtonText = "S'inscrire",
  facebookText = "Continuez avec Facebook",
  googleText = "continue_with",
  seperatorText = "OU",
  errorText = (
    <>
      Oops! Une erreur s&apos;est produite lors de la tentative de connexion!
      <br /> Veuillez réessayer, ou utilisez une autre méthode de connexion.
    </>
  ),
  onSuccessfullLogin,
  onResetPassowordRequestSuccess,
}) => {
  const {
    handleAuthentication,
    handleFacebookSignInFailure,
    handleGoogleSingInFailure,
    hasError,
  } = useAuthenticator({ onSuccessfullLogin });

  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <div className="grid">
        {isSignUp ? (
          <EmailAndPasswordSignUp
            text={signUpButtonText}
            onSubmit={handleAuthentication("SIGN_UP")}
          />
        ) : (
          <EmailAndPasswordSignIn
            text={loginButtonText}
            onSubmit={handleAuthentication(AUTH_PROVIDERS.CLASSIC)}
            onResetPassowordRequestSuccess={onResetPassowordRequestSuccess}
          />
        )}
        <div className="mb-1 text-center">
          <span className="text-sm font-bold">{seperatorText}</span>
        </div>
        <FacebookButton
          onSuccess={handleAuthentication(AUTH_PROVIDERS.FACEBOOK)}
          text={facebookText}
          onFail={handleFacebookSignInFailure}
        />
        <GoogleButton
          onSuccess={handleAuthentication(AUTH_PROVIDERS.GOOGLE)}
          text={googleText}
          onFail={handleGoogleSingInFailure}
        />
        {hasError && (
          <div className="pt-4 text-center text-xs text-red-500">
            {errorText}
          </div>
        )}
        <p className="mx-auto max-w-xs py-6 text-center text-xs">
          En continuant, vous acceptez
          <a target="_blank" href="/terms-of-service">
            <strong> les conditions d&apos;utilisation </strong>de Boilerplate
          </a>{" "}
          et reconnaissez avoir lu notre
          <a href="/privacy-policy" target="_blank">
            <strong> Politique de confidentialité.</strong>
          </a>
        </p>
        <hr />
        <button onClick={() => setIsSignUp((prev) => !prev)}>
          <p className="mx-auto max-w-xs pt-6 text-center text-xs">
            {isSignUp ? (
              <>
                Déjà membre? <strong>Se connecter</strong>
              </>
            ) : (
              <>
                Vous n&apos;avez pas un compte? <strong>S&apos;inscrire</strong>
              </>
            )}
          </p>
        </button>
      </div>
    </div>
  );
};

export default Authenticator;
