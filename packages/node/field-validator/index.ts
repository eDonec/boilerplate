import CustomInputError, { ICustomError } from "custom-error/customInputError";

import FieldValidator from "./FieldValidator";

export default class Validator<
  T extends Record<string, string | number | Date | undefined> = Record<
    string,
    string | number | Date | undefined
  >
> {
  fields: (keyof T)[] = [];

  validate: { [key in keyof T]: FieldValidator };

  constructor(objectToValidate: T) {
    if (!Object.keys(objectToValidate).length)
      throw new Error("At least one field should be passed");

    const { typeErrors, fields, validate } =
      extractFieldValidatorsFromObject(objectToValidate);

    if (typeErrors.length)
      throw new CustomInputError({
        message: "All fields must be strings, numbers or Dates",
        fields: typeErrors,
      });

    this.fields = fields;
    this.validate = validate;
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

const extractFieldValidatorsFromObject = <
  T extends Record<string, string | number | Date | undefined>
>(
  objectToValidate: T
) => {
  const typeErrors: { fieldName: string; message: string }[] = [];
  const validate = {} as { [key in keyof T]: FieldValidator };
  const fields = [] as (keyof T)[];

  (Object.keys(objectToValidate) as (keyof T)[]).forEach((key) => {
    if (
      objectToValidate[key] &&
      typeof objectToValidate[key] !== "string" &&
      typeof objectToValidate[key] !== "number" &&
      !(objectToValidate[key] instanceof Date)
    )
      typeErrors.push({
        fieldName: key as string,
        message: `${key} must be a string, number or Date`,
      });
    validate[key] = new FieldValidator(objectToValidate[key], key as string);

    fields.push(key);
  });

  return {
    validate,
    fields,
    typeErrors,
  };
};
