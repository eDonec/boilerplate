import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import "locales/index";

import store from "_redux/store";

import HomePage from "../index";

describe("HomePage Renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(baseElement).toBeTruthy();
  });
});
