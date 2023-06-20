import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AuthNRouteTypes } from "auth-types/routes/authN";
import { isApiError } from "server-sdk";
import {
  isNotFoundError,
  isObjectValidationError,
  isUnauthorizedError,
} from "shared-types";

export type ISignUpForm = AuthNRouteTypes["/n/classic"]["POST"]["body"];

const useSignUp = (onSubmit: (data: ISignUpForm) => void | Promise<void>) => {
  const formMethods = useForm<ISignUpForm>();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler: SubmitHandler<ISignUpForm> = async (value) => {
    setIsLoading(true);
    try {
      await onSubmit(value);
    } catch (error) {
      if (isApiError(error)) {
        const errorData = error.response?.data;

        if (isObjectValidationError(errorData)) {
          errorData.fields.forEach((field) => {
            if (Object.keys(value).includes(field.fieldName))
              formMethods.setError(field.fieldName as keyof ISignUpForm, {
                message: field.message,
              });
          });
        } else if (isNotFoundError(errorData)) {
          formMethods.setError("email", {
            message: errorData.ressource,
          });
        } else if (isUnauthorizedError(errorData)) {
          formMethods.setError("password", {
            message: errorData.message,
          });
        }
      } else {
        // toast.error((error as Error).message);
      }
    }
    setIsLoading(false);
  };

  return { formMethods, onSubmit: submitHandler, isLoading };
};

export default useSignUp;
