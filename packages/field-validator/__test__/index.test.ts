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

describe("should work with undefined values", () => {
  it("should work", () => {
    const valuesUndefined = {
      email: "hey@yo.com",
      password: "password",
      userName: undefined,
    };

    validators = new Validator(valuesUndefined);

    validators.validate.email.exists().isString().isEmail();
    validators.validate.password.exists().isString().minLength(8);
    if (valuesUndefined.userName)
      validators.validate.userName.isString().minLength(6);

    expect(() => validators.resolveErrors()).not.toThrow("Validation error!");
  });
});

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
      validators.validate.invalidEmail.exists().isEmail().error?.message
    ).toBeTruthy();
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
  //string
  it("should throw an error in case of an invalid alpha", () => {
    expect(
      validators.validate.invalidAlpha.isAlpha().error?.message
    ).toBeTruthy();
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });

  it("should throw an error in case of an invalid alphaSpace", () => {
    expect(
      validators.validate.invalidAlphaSpace.isAlphaSpace().error?.message
    ).toBeTruthy();
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });

  it("should throw an error in case of an invalid alphaNum", () => {
    expect(
      validators.validate.invalidAlphaNum.isAlphaNum().error?.message
    ).toBeTruthy();
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
  it("should throw an error in case of an empty string", () => {
    expect(
      validators.validate.emptyString.isEmpty().error?.fields[0].message
    ).toBe("emptyString is empty");
    expect(() => validators.resolveErrors()).toThrow("Validation error!");
  });
});
// password
it("should throw an error in case of a short password", () => {
  expect(
    validators.validate.shortPassword.minLength(5).error?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of a long password", () => {
  expect(
    validators.validate.longPassword.maxLength(7).error?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

it("should throw an error in case of a different passwords", () => {
  expect(
    validators.validate.invalidPassword.isPasswordMatch("passwor").error
      ?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//url
it("should throw an error in case of an invalid url", () => {
  expect(validators.validate.invalidUrl.isUrl().error?.message).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//date
it("should throw an error in case of an invalid date", () => {
  expect(validators.validate.invalidDate.isDate().error?.message).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of  invalidAfterDate", () => {
  expect(
    validators.validate.validDate.isAfterDate(sub(new Date(), { days: 1 }))
      .error
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

it("should throw an error in case of  invalidBeforeDate", () => {
  expect(
    validators.validate.validDate.isBeforDate(add(new Date(), { days: 1 }))
      .error
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});

//number
it("should throw an error in case of an invalid number", () => {
  expect(
    validators.validate.invalidNumber.isNumber().error?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of isBetween", () => {
  expect(
    validators.validate.validNumber.isBetween({ min: 10, max: 8 }).error
      ?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of maxNumber", () => {
  expect(
    validators.validate.validNumber.isBiggerThanNumber(9).error?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
it("should throw an error in case of minNumber", () => {
  expect(
    validators.validate.validNumber.isLessThanNumber(13).error?.message
  ).toBeTruthy();
  expect(() => validators.resolveErrors()).toThrow("Validation error!");
});
