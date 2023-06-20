import { FormProvider } from "react-hook-form";

import Button from "core-ui/Button";
import Modal from "core-ui/Modal";
import Input from "forms/Input";

import useSignIn, { ISignInForm } from "./useEmailAndPasswordSignIn";
import ResetPasswordForm from "../ResetPasswordForm";

interface IProps {
  onSubmit: (data: ISignInForm) => void | Promise<void>;
  text: string;
  onResetPassowordRequestSuccess?: () => void;
}

const EmailAndPasswordSignIn: React.FC<IProps> = ({
  onSubmit: submitHandler,
  text,
  onResetPassowordRequestSuccess,
}) => {
  const {
    formMethods,
    onSubmit,
    isLoading,
    isResetPasswordModalVisible,
    setIsResetPasswordModalVisible,
  } = useSignIn(submitHandler);

  function handleResetPasswordRequestSuccess() {
    setIsResetPasswordModalVisible(false);
    onResetPassowordRequestSuccess?.();
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form className="mb-4" onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Input
            validate={[{ rule: "isEmpty" }, { rule: "isEmail" }]}
            name="email"
            type="text"
            outerWrapperClassName="mb-2"
            autoComplete="email username"
            displayName="L'email"
            placeholder="admin@example.com"
            label="Email"
          />
          <Input
            validate={[{ rule: "isEmpty" }, { rule: "minLength", param: 8 }]}
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            label="Mot de passe"
            displayName="Le mot de passe"
          />
          <div className="mt-1 flex">
            <button
              type="button"
              onClick={() => setIsResetPasswordModalVisible(true)}
              className="mb-2 mt-0 text-sm text-blue-600 hover:underline"
            >
              Mot de passe oublié
            </button>
          </div>
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
      <Modal
        isOpen={isResetPasswordModalVisible}
        title="Mot de passe oublié"
        handleClose={() => setIsResetPasswordModalVisible(false)}
        shouldUnmountOnClose
      >
        <ResetPasswordForm
          className="mt-4"
          onResetPassowordRequestSuccess={handleResetPasswordRequestSuccess}
        />
      </Modal>
    </>
  );
};

export default EmailAndPasswordSignIn;
