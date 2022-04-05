import CustomInputError, { ICustomError } from "custom-error/customInputError";

import FieldValidator from "./FieldValidator";

export default class Validator {
  fields: string[] = [];

  validate: { [key: string]: FieldValidator } = {};

  constructor(strings: Record<string, string | number | Date | undefined>) {
    if (!Object.keys(strings).length)
      throw new Error("At least one field should be passed");
    Object.keys(strings).forEach((key) => {
      if (
        strings[key] &&
        typeof strings[key] !== "string" &&
        typeof strings[key] !== "number" &&
        !(strings[key] instanceof Date)
      )
        throw new CustomInputError({
          message: `${key} must have type string or number or date for this initiation`,
          fields: [],
        });
      this.validate[key] = new FieldValidator(strings[key], key);
      this.fields.push(key);
    });
  }

  resolveErrors() {
    const errors: CustomInputError[] = [];

    this.fields.forEach((field) => {
      if (!this.validate) return;
      if (this.validate[field].error instanceof CustomInputError)
        errors.push(this.validate[field].error as CustomInputError);
    });
    if (errors.length > 0) {
      const message = "Validation error!";
      let fields: ICustomError["fields"] = [];

      errors.forEach((error) => {
        fields = [...fields, ...(error.fields || [])];
      });
      throw new CustomInputError({ message, fields });
    }
  }
}
