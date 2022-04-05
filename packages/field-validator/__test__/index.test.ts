import CustomInputError from "custom-error/customInputError";
import add from "date-fns/add";
import sub from "date-fns/sub";

import Validator from "..";

const stringsToTest = {
  invalidEmail: "email@testcom",
  validEmail: "email@test.com",
  shortPassword: "1234",
  longPassword: "12345678",
  emptyString: "",
  invalidAlpha: "test1",
  invalidUrl: "test",
  validUrl: "https://www.edonec.com/",
  invalidAlphaNum: "test?",
  invalidAlphaSpace: "test3test",
  invalidPassword: "password",
  invalidDate: "1995/01/06",
  invalidNumber: "12aa",
  validNumber: 12,
  validDate: new Date(),
};
let validators: Validator;

describe("string Validators to initialize", () => {
  beforeEach(() => {
    validators = new Validator(stringsToTest);
  });
  it("should initialize", () => {
    expect(validators).toBeTruthy();
  });

  //email
  it("should throw an error in case of an invalid email", () => {
    expect(
      validators.validate.invalidEmail.exists().isEmail().error
    ).toBeInstanceOf(CustomInputError);
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
  //string
  it("should throw an error in case of an invalid alpha", () => {
    expect(validators.validate.invalidAlpha.isAlpha().error).toBeInstanceOf(
      CustomInputError
    );
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });

  it("should throw an error in case of an invalid alphaSpace", () => {
    expect(
      validators.validate.invalidAlphaSpace.isAlphaSpace().error
    ).toBeInstanceOf(CustomInputError);
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });

  it("should throw an error in case of an invalid alphaNum", () => {
    expect(
      validators.validate.invalidAlphaNum.isAlphaNum().error
    ).toBeInstanceOf(CustomInputError);
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
  it("should throw an error in case of an empty string", () => {
    expect(validators.validate.emptyString.isEmpty().error).toBeInstanceOf(
      CustomInputError
    );
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
});
// password
it("should throw an error in case of a short password", () => {
  expect(validators.validate.shortPassword.minLength(5).error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of a long password", () => {
  expect(validators.validate.longPassword.maxLength(7).error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

it("should throw an error in case of a different passwords", () => {
  expect(
    validators.validate.invalidPassword.isPasswordMatch("passwor").error
  ).toBeInstanceOf(CustomInputError);
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//url
it("should throw an error in case of an invalid url", () => {
  expect(validators.validate.invalidUrl.isUrl().error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//date
it("should throw an error in case of an invalid date", () => {
  expect(validators.validate.invalidDate.isDate().error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of  invalidAfterDate", () => {
  expect(
    validators.validate.validDate.isAfterDate(sub(new Date(), { days: 1 }))
      .error
  ).toBeInstanceOf(CustomInputError);
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

it("should throw an error in case of  invalidBeforeDate", () => {
  expect(
    validators.validate.validDate.isBeforDate(add(new Date(), { days: 1 }))
      .error
  ).toBeInstanceOf(CustomInputError);
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//number
it("should throw an error in case of an invalid number", () => {
  expect(validators.validate.invalidNumber.isNumber().error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of isBetween", () => {
  expect(validators.validate.validNumber.isBetween(10, 8).error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of maxNumber", () => {
  expect(validators.validate.validNumber.maxNumber(9).error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of minNumber", () => {
  expect(validators.validate.validNumber.minNumber(13).error).toBeInstanceOf(
    CustomInputError
  );
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
