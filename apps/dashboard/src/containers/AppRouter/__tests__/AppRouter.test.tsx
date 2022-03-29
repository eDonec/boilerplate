import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import store from "_redux/store";

import AppRouter from "..";

test("renders the app without crashing", () => {
  const { baseElement } = render(
    <Provider store={store}>
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    </Provider>
  );

  expect(baseElement).toBeTruthy();
});
