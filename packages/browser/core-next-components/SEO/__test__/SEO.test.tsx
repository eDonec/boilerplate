import { createMockRouter } from "__mocks__/createMockRouter";
import { render } from "@testing-library/react";

import { RouterContext } from "next/dist/shared/lib/router-context";

import SEO from "../";

describe("SEO Renderer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter()}>
        <SEO
          title="generated_string"
          description="generated_string"
          image="generated_string"
        />
      </RouterContext.Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
