import AuthSDK from "..";

it("should instantiate successfully", () => {
  const authSDK = new AuthSDK("test");

  expect(authSDK).toBeTruthy();
});
