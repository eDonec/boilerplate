export interface ICustomError {
  message: string;
  fields?: string[];
  stack?: string;
  name: string;
}
export default class CustomInputError extends Error {
  fields?: string[];

  constructor({ message, fields, stack, name }: ICustomError) {
    super(message);
    this.name = name;
    this.stack = stack;
    this.fields = fields;
    Object.setPrototypeOf(this, CustomInputError.prototype);
  }
}
