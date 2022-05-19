import { INotFoundError } from "shared-types/Errors";

export default class NotFoundError extends Error {
  ressource: string;

  constructor({ message, ressource, name }: INotFoundError) {
    super(message);
    this.name = name || "Not Found ressource!";
    this.ressource = ressource;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
