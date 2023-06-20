import { render } from "@testing-library/react";
import "locales/index";

import AppRouter from "..";

test("renders the app without crashing", () => {
  const { baseElement } = render(<AppRouter />);

  expect(baseElement).toBeTruthy();
});
