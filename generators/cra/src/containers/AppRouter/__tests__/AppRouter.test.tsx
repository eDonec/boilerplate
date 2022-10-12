import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import "locales/index";

import store from "_redux/store";

import AppRouter from "..";

test("renders the app without crashing", () => {
  const { baseElement } = render(
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );

  expect(baseElement).toBeTruthy();
});
