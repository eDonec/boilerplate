import { Authenticator } from "authenticator";
import SEO from "core-cra-components/SEO";

import { LoggedOutWrapper } from "containers/AuthWrappers/LoggedOutWrapper";

export const SignIn = () => (
  <LoggedOutWrapper>
    <SEO title="Dashboard sign in" />
    <div className="flex min-h-screen items-center justify-center ">
      <div className="mt-4 bg-white px-40 py-32 text-left shadow-xl dark:bg-black">
        <h3 className="text-center text-2xl font-bold">
          Login to your account
        </h3>
        <Authenticator />
      </div>
    </div>
  </LoggedOutWrapper>
);
