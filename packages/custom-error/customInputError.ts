export interface ICustomError {
  message: string;
  fields: { fieldName: string; message: string }[];
  stack?: string;
}
export default class CustomInputError extends Error {
  fields: { fieldName: string; message: string }[];

  constructor({ message, fields, stack }: ICustomError) {
    super(message);
    this.name = "String Validation Error!";
    this.stack = stack;
    this.fields = fields;
    Object.setPrototypeOf(this, CustomInputError.prototype);
  }
}
