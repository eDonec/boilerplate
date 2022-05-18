import { INotFoundError } from "shared-types/Errors";

export default class NotFoundError extends Error {
  ressource: string;

  constructor({ message, ressource, stack, name }: INotFoundError) {
    super(message);
    this.name = name || "Not Found ressource!";
    this.ressource = ressource;
    this.stack = stack;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
