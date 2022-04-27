/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "core-utils";
import CustomInputError, { ICustomError } from "custom-error/customInputError";

import FieldValidator from "./FieldValidator";

export default class Validator<T = any> {
  fields: string[] = [];

  validate: { [key in keyof T]: any };

  constructor(objectToValidate: T) {
    if (!Object.keys(objectToValidate).length)
      throw new Error("At least one field should be passed");

    this.validate = extractFieldValidatorsFromObject({
      input: objectToValidate,
      fields: this.fields,
    });
  }

  resolveErrors() {
    const errors: { fields: CustomInputError["fields"]; message: string }[] =
      [];

    this.fields.forEach((field) => {
      if (!this.validate) return;

      const currentField = get(this.validate, field);

      if (currentField.fieldHasMultipleValidators) {
        if (!currentField.oneOfValidatorsIsClean && currentField.error) {
          errors.push(
            (currentField.multipleValidatorsError || currentField.error) as {
              fields: CustomInputError["fields"];
              message: string;
            }
          );
        }
      } else if (currentField.error)
        errors.push(
          currentField.error as {
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

export const extractFieldValidatorsFromObject = <T = any>({
  input,
  key = "",
  fields = [],
}: {
  input: T;
  key?: string;
  fields?: string[];
}): any => {
  const output: any = {};

  if (
    typeof input === "string" ||
    typeof input === "number" ||
    input instanceof Date
  ) {
    fields.push(key);

    return new FieldValidator(input, key);
  }
  if (input instanceof Array) {
    return input.map((el, i) =>
      extractFieldValidatorsFromObject({
        input: el,
        key: `${key ? `${key}.` : ""}${i}`,
        fields,
      })
    );
  }

  if (typeof input === "object")
    Object.entries(input).forEach(([objectKey, value]) => {
      output[objectKey] = extractFieldValidatorsFromObject({
        input: value,
        key: `${key ? `${key}.` : ""}${objectKey}`,
        fields,
      });
    });

  return output;
};
