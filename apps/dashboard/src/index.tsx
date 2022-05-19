import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import DarkModeProvider from "core-ui/DarkModeProvider";
import "locales";
import "./sdks";

import "styles/globals.css";
import "styles/colors.css";

import AppRouter from "containers/AppRouter";

import store from "_redux/store";

import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/dashboard">
      <Provider store={store}>
        <DarkModeProvider>
          <AppRouter />
        </DarkModeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
