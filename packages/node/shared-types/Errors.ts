export type IObjectValidationError = {
  fields: { fieldName: string; message: string }[];
  message: string;
  stack?: string;
  name?: string;
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

export type INotFoundError = {
  message: string;
  ressource: string;
  stack?: string;
  name?: string;
};
type TCustomErrors =
  | IObjectValidationError
  | TUnknownError
  | IUnauthorizedError
  | INotFoundError;
export default TCustomErrors;
