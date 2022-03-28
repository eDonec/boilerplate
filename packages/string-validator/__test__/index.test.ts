import StringValidator from "..";

const stringsToTest = {
  invalidEmail: "email@testcom",
  validEmail: "email@test.com",
  shortPassword: "1234",
  longPassword: "12345678",
};

const validators = new StringValidator(stringsToTest);

describe("string Validators to initialize", () => {
  it("should initialize", () => {
    expect(validators).toBeTruthy();
  });
});

// TODO: a test for every function in the Validator class should be executed here
