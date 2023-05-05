import TCustomErrors, {
  isNotFoundError,
  isObjectValidationError,
  isUnauthorizedError,
} from "shared-types/Errors";

import NotFoundError from "./NotFoundError";
import ObjectValidationError from "./ObjectValidationError";
import UnauthorizedError from "./UnauthorizedError";

type ApiError = {
  response: {
    data: TCustomErrors | unknown;
  };
};

const isApiError = (error: unknown): error is ApiError =>
  (error as ApiError).response !== undefined;

const getStandardizedThrowableError = <T>(error: T) => {
  if (isApiError(error)) {
    if (isObjectValidationError(error.response.data)) {
      return new ObjectValidationError({
        ...error.response.data,
      });
    }
    if (isUnauthorizedError(error.response.data)) {
      return new UnauthorizedError({
        ...error.response.data,
      });
    }
    if (isNotFoundError(error.response.data)) {
      return new NotFoundError({
        ...error.response.data,
      });
    }
  }

  return error;
};

export default getStandardizedThrowableError;
