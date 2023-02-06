import { tokenValidatorClassMock } from "../__mocks__/tokenClassMock";
import TokenGenerator from "../TokenGenerator";
import TokenValidator from "../TokenValidator";

const tokenPayload = {
  aud: "audience",
  iss: "issuer",
  sid: "session Id",
  payload: { foo: "bar" },
};
const validToken = new TokenGenerator(tokenPayload);
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2YzZjFiYWIxMmFlZWEwMThhNGI3OCIsInNlc3Npb25JZCI6IlJuR1FrQk05YTY3aXIwUG1fNloxSCIsImlhdCI6MTY0ODMxMjA5MSwiZXhwIjoxNjQ4MzEzODkxfQ.klIN9OA0a0If8T48XfmKEkbdtP8JB7hi9cz3Y-BVbFs";

describe("Token Services Class constructor error throwing", () => {
  it("should throw an error when bad token is passed", () => {
    expect(tokenValidatorClassMock("bad token")).toThrow("Token invalid");
  });
  it("should throw an error when No token is passed", () => {
    expect(tokenValidatorClassMock()).toThrow("Please Provide a token");
  });
  it("should return an invalid token error", () => {
    // const token = new TokenValidator(expiredToken);

    expect(tokenValidatorClassMock(expiredToken)).toThrow("Token invalid");
  });
});

describe("Token Services Class token generation/validation", () => {
  it("should create a token", () => {
    expect(validToken.token).toBeTruthy();
  });

  it("should be a valid token", () => {
    const token = new TokenValidator(validToken.token);

    expect(token.validate()).toBe(true);
  });
  it("should have a token with valid issuer and audience", () => {
    const token = new TokenValidator<{ foo: string }>(validToken.token);

    expect(
      token.validateIssuerAndProvider({
        iss: validToken.decodedToken.iss,
        aud: validToken.decodedToken.aud,
      })
    ).toBe(true);
  });
  it("should have a token with correct payload", () => {
    const token = new TokenValidator<{ foo: string }>(validToken.token);

    expect(JSON.stringify(token.decodedToken.payload)).toBe(
      JSON.stringify(tokenPayload.payload)
    );
  });
});
