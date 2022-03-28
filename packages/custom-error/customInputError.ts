export interface ICustomError {
  message: string;
  fields?: string[];
  stack?: string;
}
export default class CustomInputError extends Error {
  fields?: string[];

  constructor({ message, fields, stack }: ICustomError) {
    super(message);
    this.name = "String Validation Error!";
    this.stack = stack;
    this.fields = fields;
    Object.setPrototypeOf(this, CustomInputError.prototype);
  }
}
