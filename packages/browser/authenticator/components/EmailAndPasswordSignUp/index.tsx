import { FormProvider } from "react-hook-form";

import Button from "core-ui/Button";
import Input from "forms/Input";

import useSignUp, { ISignUpForm } from "./useEmailAndPasswordSignUp";

interface IProps {
  onSubmit: (data: ISignUpForm) => void | Promise<void>;
  text: string;
}

const EmailAndPasswordSignUp: React.FC<IProps> = ({
  onSubmit: submitHandler,
  text,
}) => {
  const { formMethods, onSubmit, isLoading } = useSignUp(submitHandler);

  return (
    <FormProvider {...formMethods}>
      <form className="mb-4" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Input
          validate={[{ rule: "isEmpty" }, { rule: "isEmail" }]}
          name="email"
          type="text"
          outerWrapperClassName="mb-2"
          autoComplete="email username"
          placeholder="email@example.com"
          label="Email"
          displayName="L'email"
        />
        <Input
          validate={[{ rule: "isEmpty" }, { rule: "minLength", param: 8 }]}
          name="password"
          type="password"
          outerWrapperClassName="mb-2"
          placeholder="••••••••"
          autoComplete="current-password"
          label="Mot de passe"
          displayName="Le mot de passe"
        />
        <Input
          validate={[
            { rule: "isEmpty" },
            { rule: "isPasswordMatch", param: formMethods.watch("password") },
          ]}
          name="confirmPassword"
          type="password"
          outerWrapperClassName="mb-4"
          placeholder="••••••••"
          autoComplete="current-password"
          label="Confirmez votre mot de passe"
          displayName="La confirmation du nouveau mot de passe"
        />
        <Button
          className="m-auto w-full"
          type="submit"
          isLoading={isLoading}
          light
        >
          {text}
        </Button>
      </form>
    </FormProvider>
  );
};

export default EmailAndPasswordSignUp;
