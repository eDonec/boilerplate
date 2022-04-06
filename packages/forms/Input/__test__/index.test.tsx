import { render } from "@testing-library/react";

import RawInput from "../RawInput";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RawInput
        name="Test name"
        label="test label"
        placeholder="input placeholder"
        type="text"
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
