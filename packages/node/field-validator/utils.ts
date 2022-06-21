import { Primitives } from "./validationTypes";

export const isPrimitive = (value?: unknown): value is Primitives => {
  if (!value) return true;
  if (
    value instanceof Date ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return true;

  return false;
};
