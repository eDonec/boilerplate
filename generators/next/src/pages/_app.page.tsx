import Api from "api";
import { AuthenticatorProvider } from "authenticator";
import DarkModeProvider from "core-ui/DarkModeProvider";
import i18n from "locales";

import { AppProps } from "next/app";
import Head from "next/head";

import "styles/globals.css";
import "styles/colors.css";

import TranslationProvider from "components/TranslationProvider";

if (!i18n.isInitialized) {
  i18n.init();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <AuthenticatorProvider authDomain="client" mainApi={Api.mainApi}>
        <TranslationProvider>
          <DarkModeProvider>
            <Component {...pageProps} />
          </DarkModeProvider>
        </TranslationProvider>
      </AuthenticatorProvider>
    </>
  );
}
export default MyApp;
