import { IUnauthorizedError } from "shared-types/Errors";

export default class UnauthorizedError extends Error {
  reason: string;

  ressource?: string;

  requiredRole?: string;

  constructor({
    message,
    reason,
    ressource,
    requiredRole,
    stack,
    name,
  }: IUnauthorizedError) {
    super(message);
    this.name = name || "Unauthorized access to ressource!";
    this.stack = stack;
    this.reason = reason;
    this.ressource = ressource;
    this.requiredRole = requiredRole;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
