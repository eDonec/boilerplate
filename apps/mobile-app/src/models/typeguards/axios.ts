import { AxiosError } from 'axios';

export const isAxiosError = (
  error: unknown,
): error is AxiosError<{ message: string } | string> =>
  (error as AxiosError)?.isAxiosError === true;
