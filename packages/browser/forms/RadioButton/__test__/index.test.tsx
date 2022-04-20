import { render } from "@testing-library/react";

import RawRadioButton from "../RawRadioButton";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RawRadioButton
        name="Test name"
        values={[{ value: "value test", label: "label test" }]}
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
