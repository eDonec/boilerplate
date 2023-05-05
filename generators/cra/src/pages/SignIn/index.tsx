import { FormProvider } from "react-hook-form";

import SEO from "core-cra-components/SEO";
import Button from "core-ui/Button";
import { Input } from "forms";

import { LoggedOutWrapper } from "containers/AuthWrappers/LoggedOutWrapper";

import useSignIn from "./useSignIn";

export const SignIn = () => {
  const { isLoading, formMethods, onSubmit } = useSignIn();

  return (
    <LoggedOutWrapper>
      <SEO title="Dashboard sign in" />
      <div className="flex min-h-screen items-center justify-center ">
        <div className="mt-4 bg-white px-40 py-32 text-left shadow-xl dark:bg-black">
          <h3 className="text-center text-2xl font-bold">
            Login to your account
          </h3>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <div className="mt-4">
                <Input
                  validate={[{ rule: "isEmpty" }, { rule: "isEmail" }]}
                  name="email"
                  type="text"
                  placeholder="admin@example.com"
                  label="Email"
                />
                <Input
                  validate={[{ rule: "isEmpty" }]}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  label="Password"
                />
                <div className="-mt-4 mb-6 flex justify-end">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div>
                  <div className="flex justify-center">
                    <Button type="submit" isLoading={isLoading} primary>
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </LoggedOutWrapper>
  );
};
