import { render, screen } from "@testing-library/react";

import FacebookButton from "../index";

describe("FacebookButton component", () => {
  it("renders with correct text", () => {
    const text = "Sign in with Facebook";

    render(
      <FacebookButton text={text} onSuccess={() => {}} onFail={() => {}} />
    );
    const buttonElement = screen.getByText(text);

    expect(buttonElement).toBeInTheDocument();
  });
});
