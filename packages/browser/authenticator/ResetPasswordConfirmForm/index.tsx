import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AuthSDKTypes } from "auth-sdk";
import { Button } from "core-ui";
import { clsx } from "core-utils";
import { Input } from "forms";

import LocalAuthApi from "../api";

type ResetPasswordConfirmFormProps = {
  className?: string;
  token: string;
  onResetPasswordConfirmSuccess?: () => void;
  errorText?: React.ReactNode;
};

function ResetPasswordConfirmForm({
  className,
  token,
  onResetPasswordConfirmSuccess,
  errorText = <>Oops! Une erreur est survenue!</>,
}: ResetPasswordConfirmFormProps) {
  const formMethods = useForm<AuthSDKTypes["ResetPasswordConfirmBodyType"]>();
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(
    data: AuthSDKTypes["ResetPasswordConfirmBodyType"]
  ) {
    try {
      setHasError(false);
      await LocalAuthApi.authSDK.resetPasswordConfirm({
        body: data,
        query: { token },
      });

      onResetPasswordConfirmSuccess?.();
    } catch (error) {
      setHasError(true);
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className={clsx(className, "space-y-6")}
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <Input
          validate={[{ rule: "isEmpty" }, { rule: "minLength", param: 8 }]}
          name="newPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          label="Nouveau mot de passe"
        />
        <Input
          validate={[
            { rule: "isEmpty" },
            {
              rule: "isPasswordMatch",
              param: formMethods.watch("newPassword"),
            },
          ]}
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          label="Confirmation du mot de passe"
        />

        <Button className="w-full" type="submit" light>
          Confirmer
        </Button>
        {hasError && (
          <div className="mt-4 text-center text-xs text-red-500">
            {errorText}
          </div>
        )}
      </form>
    </FormProvider>
  );
}

export default ResetPasswordConfirmForm;
