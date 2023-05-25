import { isApiError } from 'server-sdk';
import { showToast } from './showToast';

export const errorMessageExtractor = (
  error: unknown,
  fallback = 'Error connecting to server',
) => {
  let message = fallback;

  if (isApiError<{ message: string }>(error) && error.response?.data.message)
    message = error.response.data.message;

  return message;
};

export const errorHandler = (error: unknown): void => {
  const message = errorMessageExtractor(error);

  showToast(message, 'DANGER');
};
