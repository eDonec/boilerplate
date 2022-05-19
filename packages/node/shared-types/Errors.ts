export type IObjectValidationError = {
  fields: { fieldName: string; message: string }[];
  message: string;
  stack?: string;
  name?: string;
};
export const isObjectValidationError = (
  error: TCustomErrors | unknown
): error is IObjectValidationError => {
  if ((error as IObjectValidationError).fields) return true;

  return false;
};

export type TUnknownError = {
  stack?: string;
  message: string;
};

export type IUnauthorizedError = {
  message: string;
  reason: string;
  stack?: string;
  name?: string;
  ressource?: string;
  requiredRole?: string;
};
export const isUnauthorizedError = (
  error: TCustomErrors | unknown
): error is IUnauthorizedError => {
  if ((error as IUnauthorizedError).reason) return true;

  return false;
};
export type INotFoundError = {
  message: string;
  ressource: string;
  stack?: string;
  name?: string;
};
export const isNotFoundError = (
  error: TCustomErrors | unknown
): error is INotFoundError => {
  if ((error as INotFoundError).ressource) return true;

  return false;
};
type TCustomErrors =
  | IObjectValidationError
  | TUnknownError
  | IUnauthorizedError
  | INotFoundError;
export default TCustomErrors;
