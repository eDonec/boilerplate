import { render } from "@testing-library/react";

import RowCheckBox from "../RawCheckBox";

describe("Button renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RowCheckBox name="Test name" label="test label" />
    );

    expect(baseElement).toBeTruthy();
  });
});
