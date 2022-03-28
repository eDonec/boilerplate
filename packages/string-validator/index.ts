import CustomInputError from "custom-error/customInputError";

import Validator from "./Validator";

export default class StringValidator {
  [key: string]: Validator;

  constructor(strings: Record<string, string | undefined>) {
    Object.keys(strings).forEach((key) => {
      if (
        strings[key] &&
        typeof strings[key] !== "string" &&
        typeof strings[key] !== "number"
      )
        throw new CustomInputError({
          message: `${key} must have type string or number for this initiation`,
          fields: [key],
        });
      this[key] = new Validator(String(strings[key]), key);
    });
  }
}
