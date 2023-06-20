import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Api from "api";
import { AuthSDKTypes } from "auth-sdk";
import { isApiError } from "server-sdk";

import { useRouter } from "next/router";

export function useEditPasswordPage() {
  const router = useRouter();
  const formMethods = useForm<AuthSDKTypes["UpdatePasswordBodyType"]>();

  async function handleSubmit(data: AuthSDKTypes["UpdatePasswordBodyType"]) {
    try {
      await Api.authSDK.updatePassword({ body: data });
      toast.success("Mot de passe modifié avec succès");
      router.push("/profile");
    } catch (error) {
      if (
        isApiError<{ message: string }>(error) &&
        error.response?.data.message
      )
        toast.error(error.response.data.message);
    }
  }

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleSubmit),
  };
}
