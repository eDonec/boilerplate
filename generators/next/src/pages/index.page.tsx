import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import AuthSDK, { AuthSDKTypes } from "auth-sdk";
import { ButtonLink, SEO, UnstyledLink } from "core-next-components";
import Button from "core-ui/Button";
import { Input } from "forms";
import ApiSDK from "server-sdk";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import { useRouter } from "next/router";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { decrementCounter, incrementCounter } from "_redux/slices/counter";
import { setCounterAsync } from "_redux/slices/counter/thunk";

const api = new ApiSDK();
const authSDK = new AuthSDK(api);

export default function HomePage() {
  const count = useAppSelector((state) => state.counter.count);
  const { isLoading, dispatch, classicDispatch } = useLoadingDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  const increment = () => {
    classicDispatch(incrementCounter());
  };

  const decrement = () => {
    classicDispatch(decrementCounter());
  };

  const setAsync = () => {
    dispatch(setCounterAsync(300));
  };
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const signUpFormMethods = useForm<AuthSDKTypes["SignUpClassicBodyType"]>();
  const signInFormMethods = useForm<AuthSDKTypes["SignInClassicBodyType"]>();

  const onSubmitSignUp: SubmitHandler<AuthSDKTypes["SignUpClassicBodyType"]> = (
    body
  ) => {
    authSDK.signUpClassic({ body });
  };
  const onSubmitSignIn: SubmitHandler<AuthSDKTypes["SignInClassicBodyType"]> = (
    body
  ) => {
    authSDK.signInClassic({ body });
  };

  return (
    <>
      <SEO />
      <main>
        <section className=" bg-primary-50 ">
          <div
            className="
          layout flex min-h-screen flex-col items-center justify-center bg-white text-center"
          >
            <div className="flex gap-2">
              <Button primary onClick={() => changeLanguage("fr")}>
                Fr
              </Button>
              <Button primary onClick={() => changeLanguage("en")}>
                En
              </Button>
            </div>
            <div>
              Process.env variable
              <strong>{process.env.NEXT_PUBLIC_HELLO || "Hello"}</strong>
            </div>
            <div className="flex gap-5">
              <FormProvider {...signUpFormMethods}>
                <form onSubmit={signUpFormMethods.handleSubmit(onSubmitSignUp)}>
                  <h6>Sign up form</h6>
                  <Input name="email" type="email" placeholder="email" />
                  <Input name="userName" type="text" placeholder="userName" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                  <Button primary type="submit">
                    Submit
                  </Button>
                </form>
              </FormProvider>
              <FormProvider {...signInFormMethods}>
                <form onSubmit={signInFormMethods.handleSubmit(onSubmitSignIn)}>
                  <h6>{t("signin")}</h6>
                  <Input name="email" type="email" placeholder="email" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                  <Button primary type="submit">
                    Submit
                  </Button>
                </form>
              </FormProvider>
            </div>
            <Button info type="button" onClick={() => authSDK.logout()}>
              logout
            </Button>

            <h1 className="mt-4">
              Next.js + Tailwind CSS + TypeScript + Redux Toolkit
            </h1>
            <p className="mt-2 text-sm text-gray-800">
              A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
              Import, Seo, Link component, pre-configured with Husky{" "}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              <ButtonLink href="/dashboard">Go to dashboard</ButtonLink>
            </p>
            <p className="mt-2 text-sm text-gray-700">
              <ButtonLink href="/api/v1">Go to API</ButtonLink>
            </p>

            <ButtonLink className="mt-6" href="/components" light>
              See all components
            </ButtonLink>
            <h2 className="my-3">Redux Counter : {count}</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  info
                  disabled={count === 0 || isLoading}
                  onClick={decrement}
                >
                  Decrement
                </Button>
                <Button info disabled={isLoading} onClick={increment}>
                  Increment
                </Button>
              </div>
              <Button info onClick={setAsync} isLoading={isLoading}>
                Set Counter to 300 Async
              </Button>
            </div>
            <footer className="absolute bottom-2 text-gray-700">
              © {new Date().getFullYear()} By{" "}
              <UnstyledLink href="https://edonec.com">eDonec</UnstyledLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
