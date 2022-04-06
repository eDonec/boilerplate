import { render } from "@testing-library/react";

import Input from "..";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Input label="test label" placeholder="input placeholder" type="text" />
    );

    expect(baseElement).toBeTruthy();
  });
});
