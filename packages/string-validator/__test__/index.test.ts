import StringValidator from "..";

const stringsToTest = {
  invalidEmail: "email@testcom",
  validEmail: "email@test.com",
  shortPassword: "1234",
  longPassword: "12345678",
  emptyString: "",
};

const validators = new StringValidator(stringsToTest);

describe("string Validators to initialize", () => {
  it("should initialize", () => {
    expect(validators).toBeTruthy();
  });
  it("should throw an erro in case of an empty string", () => {
    expect(() => validators.emptyString.exists()).toThrowError(
      "emptyString is empty"
    );
  });
});

// TODO: a test for every function in the Validator class should be executed here
