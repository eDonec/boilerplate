export type IObjectValidationError = {
  message: string;
  fields: { fieldName: string; message: string }[];
  stack?: string;
  name?: string;
};

export type TUnknownError = {
  stack?: string;
  message: string;
};

type TCustomErrors = IObjectValidationError | TUnknownError;
export default TCustomErrors;
