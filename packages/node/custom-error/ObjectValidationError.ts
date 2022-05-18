import { IObjectValidationError } from "shared-types/Errors";

export default class ObjectValidationError extends Error {
  fields: { fieldName: string; message: string }[];

  constructor({ message, fields, stack, name }: IObjectValidationError) {
    super(message);
    this.name = name || "Object Validation Error!";
    this.stack = stack;
    this.fields = fields;
    Object.setPrototypeOf(this, ObjectValidationError.prototype);
  }
}
