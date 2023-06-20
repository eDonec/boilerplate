import { useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Api from "api";
import { AuthenticatorProvider } from "authenticator";
import { DarkModeProvider } from "core-ui";
import GDPRConsent from "gdpr";
import i18n from "locales";

import { AppProps } from "next/app";
import { Alexandria } from "next/font/google";

import "config/tailwind/styles/globals.css";
import "styles/custom.css";

import Navbar from "components/Navbar";
import TranslationProvider from "components/TranslationProvider";
const alexandria = Alexandria({
  subsets: ["latin"],
});

if (!i18n.isInitialized) {
  i18n.init();
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <style jsx global>
        {`
          :root {
            --main-font: ${alexandria.style.fontFamily};
          }
        `}
      </style>

      <AuthenticatorProvider authDomain="client" mainApi={Api.mainApi}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <TranslationProvider>
              <DarkModeProvider>
                <div id="navbar" />
                <div id="main">
                  <Navbar />
                  <Toaster />
                  <GDPRConsent />
                  <Component {...pageProps} />
                </div>
              </DarkModeProvider>
            </TranslationProvider>
          </Hydrate>
        </QueryClientProvider>
      </AuthenticatorProvider>
    </>
  );
}
export default MyApp;
