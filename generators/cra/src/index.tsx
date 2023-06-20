import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import Api from "api";
import { AuthenticatorProvider } from "authenticator";
import DarkModeProvider from "core-ui/DarkModeProvider";
import GDPRConsent from "gdpr";
import "locales";

import "config/tailwind/styles/globals.css";
import "styles/custom.css";

import AppRouter from "containers/AppRouter";

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
        <Toaster />
        <GDPRConsent />
        <AppRouter />
      </AuthenticatorProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
