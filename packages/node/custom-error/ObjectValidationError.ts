import { IObjectValidationError } from "shared-types/Errors";

export default class ObjectValidationError extends Error {
  fields: { fieldName: string; message: string }[];

  constructor({ message, fields, name }: IObjectValidationError) {
    super(message);
    this.name = name || "Object Validation Error!";
    this.fields = fields;
    Object.setPrototypeOf(this, ObjectValidationError.prototype);
  }
}
