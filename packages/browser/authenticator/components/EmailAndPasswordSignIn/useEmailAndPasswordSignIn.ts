import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AuthNRouteTypes } from "auth-types/routes/authN";
import { isApiError } from "server-sdk";
import {
  isNotFoundError,
  isObjectValidationError,
  isUnauthorizedError,
} from "shared-types";

export type ISignInForm = AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"];

const useSignIn = (onSubmit: (data: ISignInForm) => void | Promise<void>) => {
  const formMethods = useForm<ISignInForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);

  const submitHandler: SubmitHandler<ISignInForm> = async (value) => {
    setIsLoading(true);
    try {
      await onSubmit(value);
    } catch (error) {
      if (isApiError(error)) {
        const errorData = error.response?.data;

        if (isObjectValidationError(errorData)) {
          errorData.fields.forEach((field) => {
            if (Object.keys(value).includes(field.fieldName))
              formMethods.setError(field.fieldName as keyof ISignInForm, {
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

  return {
    formMethods,
    onSubmit: submitHandler,
    isLoading,
    isResetPasswordModalVisible,
    setIsResetPasswordModalVisible,
  };
};

export default useSignIn;
