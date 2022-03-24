import { Provider } from "react-redux";

import { AppProps } from "next/app";
import Head from "next/head";

import "styles/globals.css";
import "styles/colors.css";

import store from "_redux/store";

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
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
// !Note to self Add dark mode here by using the class `dark` in top level
export default MyApp;
