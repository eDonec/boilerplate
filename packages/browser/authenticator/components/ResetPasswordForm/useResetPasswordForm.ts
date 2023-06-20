import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AuthSDKTypes } from "auth-sdk";

import LocalAuthApi from "../../api";

export function useResetPasswordForm({
  onResetPassowordRequestSuccess,
}: {
  onResetPassowordRequestSuccess?: () => void;
}) {
  const [hasError, setError] = useState(false);

  const formMethods = useForm<AuthSDKTypes["ResetPasswordBodyType"]>();
  const handleResetPasswordRequest: SubmitHandler<
    AuthSDKTypes["ResetPasswordBodyType"]
  > = async (data) => {
    try {
      setError(false);

      await LocalAuthApi.authSDK.resetPassword({ body: data });

      onResetPassowordRequestSuccess?.();
    } catch (error) {
      setError(true);
    }
  };

  return {
    hasError,
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleResetPasswordRequest),
  };
}
