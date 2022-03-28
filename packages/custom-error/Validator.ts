import { emailRegex } from "./regex";

export default class Validator {
  stringToTest: string;

  constructor(stringToTest: string) {
    this.stringToTest = stringToTest;
  }

  isEmail() {
    if (!emailRegex.test(this.stringToTest)) throw new Error("unvalid email!");

    return this;
  }
}
