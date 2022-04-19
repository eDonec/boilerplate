import { render } from "@testing-library/react";

import Button from "..";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Button />);

    expect(baseElement).toBeTruthy();
  });
});
