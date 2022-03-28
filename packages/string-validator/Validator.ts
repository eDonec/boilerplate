import CustomInputError from "custom-error/customInputError";

import { emailRegex } from "./regex";

export default class Validator {
  stringToTest: string;

  fieldName: string;

  constructor(stringToTest: string, fieldName: string) {
    this.stringToTest = stringToTest;
    this.fieldName = fieldName;
  }

  isEmail() {
    this.exists();
    if (!emailRegex.test(this.stringToTest))
      throw new CustomInputError({
        message: `${this.fieldName} is invaild`,
        fields: [this.fieldName],
        name: "String Validation Error!",
      });

    return this;
  }

  exists() {
    if (!this.stringToTest.length)
      throw new CustomInputError({
        message: `${this.fieldName} is empty`,
        fields: [this.fieldName],
        name: "String Validation Error!",
      });

    return this;
  }

  isString() {
    if (typeof this.stringToTest !== "string")
      throw new CustomInputError({
        message: `${this.fieldName} should be longer than a string`,
        fields: [this.fieldName],
        name: "String Validation Error!",
      });

    return this;
  }

  isLongerThan(length: number) {
    if (this.stringToTest.length < length)
      throw new CustomInputError({
        message: `${this.fieldName} should be longer than ${length}`,
        fields: [this.fieldName],
        name: "String Validation Error!",
      });

    return this;
  }
}
