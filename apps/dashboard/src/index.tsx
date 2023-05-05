import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import Api from "api";
import { AuthenticatorProvider } from "authenticator";
import DarkModeProvider from "core-ui/DarkModeProvider";
import GDPRConsent from "gdpr";
import "locales";

import "config/tailwind/styles/globals.css";
import "styles/custom.css";

import AppRouter from "containers/AppRouter";

import store from "_redux/store";

import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <AuthenticatorProvider
        preventLoadingUntilInitiated
        authDomain="DASHBOARD"
        mainApi={Api.mainApi}
        role={["SUPER_ADMIN", "ADMIN"]}
      >
        <Provider store={store}>
          <Toaster />
          <GDPRConsent />
          <AppRouter />
        </Provider>
      </AuthenticatorProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
