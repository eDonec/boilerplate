import CustomInputError, { ICustomError } from "custom-error/customInputError";

import FieldValidator from "./FieldValidator";

export default class Validator {
  fields: string[] = [];

  validate: { [key: string]: FieldValidator } = {};

  constructor(strings: Record<string, string | number | Date | undefined>) {
    if (!Object.keys(strings).length)
      throw new Error("At least one field should be passed");

    const typeErrors: { fieldName: string; message: string }[] = [];

    Object.keys(strings).forEach((key) => {
      if (
        strings[key] &&
        typeof strings[key] !== "string" &&
        typeof strings[key] !== "number" &&
        !(strings[key] instanceof Date)
      )
        typeErrors.push({
          fieldName: key,
          message: `${key} must be a string, number or Date`,
        });

      this.validate[key] = new FieldValidator(strings[key], key);
      this.fields.push(key);
    });
    if (typeErrors.length)
      throw new CustomInputError({
        message: "All fields must be strings, numbers or Dates",
        fields: typeErrors,
      });
  }

  resolveErrors() {
    const errors: { fields: CustomInputError["fields"]; message: string }[] =
      [];

    this.fields.forEach((field) => {
      if (!this.validate) return;
      if (this.validate[field].error)
        errors.push(
          this.validate[field].error as {
            fields: CustomInputError["fields"];
            message: string;
          }
        );
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
