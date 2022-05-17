import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { AuthNRouteTypes } from "auth-types/routes/authN";
import {
  isNotFoundError,
  isObjectValidationError,
  isUnauthorizedError,
} from "shared-types";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { signIn } from "_redux/slices/auth/thunk";

export type ISignInForm = AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"];

const useSignIn = () => {
  const formMethods = useForm<ISignInForm>();
  const isLoggedIn = useAppSelector(({ auth }) => auth.isLoggedIn);

  const onSubmit: SubmitHandler<ISignInForm> = async (value) => {
    const response = await dispatch(signIn(value));

    if (response.meta.requestStatus === "fulfilled") return;
    const error = response.payload;

    if (isObjectValidationError(error)) {
      error.fields.forEach((field) => {
        if (Object.keys(value).includes(field.fieldName))
          formMethods.setError(field.fieldName as keyof ISignInForm, {
            message: field.message,
          });
      });
    } else if (isNotFoundError(error)) {
      formMethods.setError("email", {
        message: error.ressource,
      });
    } else if (isUnauthorizedError(error)) {
      formMethods.setError("password", {
        message: error.message,
      });
    } else {
      toast.error((error as Error).message);
    }
  };

  const { isLoading, dispatch } = useLoadingDispatch();

  return { formMethods, onSubmit, isLoading, isLoggedIn };
};

export default useSignIn;
