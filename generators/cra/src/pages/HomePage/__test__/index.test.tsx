import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import ReactChildrenProps from "shared-types/ReactChildren";
import "locales/index";

import HomePage from "../index";

jest.mock(
  "containers/AuthWrappers/PrivateWrapper",
  () =>
    ({ children }: ReactChildrenProps) =>
      children
);
// import { useAppSelector, useLoadingDispatch } from

describe("HomePage Renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<HomePage />, { wrapper: BrowserRouter });

    expect(baseElement).toBeTruthy();
  });
});
