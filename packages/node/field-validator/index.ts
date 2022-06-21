import { get } from "core-utils";
import { ObjectValidationError } from "custom-error";
import IObjectValidationError from "custom-error/ObjectValidationError";

import FieldValidator from "./FieldValidator";
import { TValidate } from "./types";
import { isPrimitive } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Validator<T extends Record<any, unknown>> {
  fields: string[] = [];

  validate: TValidate<T>;

  constructor(objectToValidate: T) {

    if (!Object.keys(objectToValidate).length)
      throw new Error("At least one field should be passed");

    this.validate = extractFieldValidatorsFromObject({
      input: objectToValidate,
      fields: this.fields,
    }) as TValidate<T>;
  }

  resolveErrors() {
    const errors: {
      fields: ObjectValidationError["fields"];
      message: string;
    }[] = [];

    this.fields.forEach((field) => {
      if (!this.validate) return;

      const currentField = get(this.validate, field);

      if (currentField.fieldHasMultipleValidators) {
        if (!currentField.oneOfValidatorsIsClean && currentField.error) {
          errors.push(
            (currentField.multipleValidatorsError || currentField.error) as {
              fields: ObjectValidationError["fields"];
              message: string;
            }
          );
        }
      } else if (currentField.error)
        errors.push(
          currentField.error as {
            fields: ObjectValidationError["fields"];
            message: string;
          }
        );
    });
    if (errors.length > 0) {
      const message = "Validation error!";
      let fields: IObjectValidationError["fields"] = [];

      errors.forEach((error) => {
        fields = [...fields, ...(error.fields || [])];
      });
      throw new ObjectValidationError({ message, fields });
    }
  }
}

export const extractFieldValidatorsFromObject = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T
>({
  input,
  key = "",
  fields = [],
}: {
  input: T;
  key?: string;
  fields?: string[];
}): FieldValidator | TValidate<T>[] | TValidate<T> => {
  const output = {} as Record<string | number | symbol, unknown>;

  if (isPrimitive(input)) {
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
    ) as TValidate<T>[];
  }

  if (typeof input === "object")
    Object.entries(input).forEach(([objectKey, value]) => {
      output[objectKey] = extractFieldValidatorsFromObject({
        input: value,
        key: `${key ? `${key}.` : ""}${objectKey}`,
        fields,
      });
    });

  return output as TValidate<T>;
};
