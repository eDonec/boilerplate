import { Provider } from "react-redux";

import i18n from "locales";

import { AppProps } from "next/app";
import Head from "next/head";

import "styles/globals.css";
import "styles/colors.css";

import TranslationLayout from "components/Layout/translationLayout";

import store from "_redux/store";

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
      <Provider store={store}>
        <TranslationLayout>
          <Component {...pageProps} />
        </TranslationLayout>
      </Provider>
    </>
  );
}
// !Note to self Add dark mode here by using the class `dark` in top level
export default MyApp;
