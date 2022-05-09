export interface IObjectValidationError {
  message: string;
  fields: { fieldName: string; message: string }[];
  stack?: string;
}
export default class ObjectValidationError extends Error {
  fields: { fieldName: string; message: string }[];

  constructor({ message, fields, stack }: IObjectValidationError) {
    super(message);
    this.name = "Object Validation Error!";
    this.stack = stack;
    this.fields = fields;
    Object.setPrototypeOf(this, ObjectValidationError.prototype);
  }
}
