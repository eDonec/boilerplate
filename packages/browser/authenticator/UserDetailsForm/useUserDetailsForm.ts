import { useState } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";

import { UserRouteTypes } from "auth-types/routes/user";
import { isApiError } from "server-sdk";
import { isObjectValidationError } from "shared-types";

import LocalAuthApi from "../api";
import { useAuthContext } from "../hooks/AuthContext";

type UserFormDetails = UserRouteTypes["/user/me"]["PUT"]["body"];

const fetchUploadToken = () =>
  LocalAuthApi.authSDK.getUploadToken({
    query: { mimeTypes: ["image"] },
  });

export const useUserDetailsForm = (onSuccessfullSubmit?: () => void) => {
  const { setAuthClient, authClient } = useAuthContext();

  const formMethods = useForm<UserFormDetails>({
    defaultValues: authClient?.user,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: SubmitHandler<UserFormDetails> = async (value) => {
    setIsLoading(true);
    try {
      const response = await LocalAuthApi.authSDK.updateSelf({
        body: value,
      });

      setAuthClient((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          user: response,
        };
      });
      onSuccessfullSubmit?.();
    } catch (error) {
      if (isApiError(error)) {
        const errorData = error.response?.data;

        if (isObjectValidationError(errorData)) {
          errorData.fields.forEach((field) => {
            if (Object.keys(value).includes(field.fieldName))
              formMethods.setError(field.fieldName as keyof UserFormDetails, {
                message: field.message,
              });
          });
        }
      }
    }
    setIsLoading(false);
  };
  const formState = useFormState({ control: formMethods.control });

  return {
    handleSubmit,
    formMethods,
    fetchUploadToken,
    isLoading,
    isDirty: Object.keys(formState.dirtyFields).length > 0,
  };
};
