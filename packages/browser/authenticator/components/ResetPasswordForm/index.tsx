import { FormProvider } from "react-hook-form";

import { Button } from "core-ui";
import { clsx } from "core-utils";
import Input from "forms/Input";

import { useResetPasswordForm } from "./useResetPasswordForm";

type ResetPasswordFormProps = {
  className?: string;
  onResetPassowordRequestSuccess?: () => void;
  errorText?: React.ReactNode;
};

function ResetPasswordForm({
  className,
  onResetPassowordRequestSuccess,
  errorText = (
    <>
      Oops! Utilisateur introuvable! <br /> Veuillez vérifier vos informations.
    </>
  ),
}: ResetPasswordFormProps) {
  const { formMethods, handleSubmit, hasError } = useResetPasswordForm({
    onResetPassowordRequestSuccess,
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit} className={clsx(className, "space-y-6")}>
        <Input
          validate={[{ rule: "isEmpty" }]}
          name="emailOrUsername"
          type="text"
          autoComplete="email username"
          placeholder="email@example.com"
          label="Email ou nom d'utilisateur"
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

export default ResetPasswordForm;
