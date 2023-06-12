import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

const emptyRole: Partial<LeanRoleDocument> = {
  name: "",
  access: [],
};

export const useAddRole = () => {
  const [t] = useTranslation();
  const [role, setRole] = useState<Partial<LeanRoleDocument> | null>(emptyRole);
  const baseRole = useRef<Partial<LeanRoleDocument> | null>(emptyRole);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [checkErrors, setCheckErrors] = useState(false);

  const onSubmit = async () => {
    if (role && canSubmit) {
      if (!role.name?.trim()) return setCheckErrors(true);

      setLoading(true);
      try {
        await Api.authSDK.addRole({
          body: { ...role, name: role.name?.trim() },
        });
        baseRole.current = role;
        toast.success(t("role.roleCreatedSuccess"));
        navigate("/roles");
      } catch (error) {
        if (
          isApiError<{ message: string }>(error) &&
          error.response?.data.message
        )
          toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);
  const canSubmit = JSON.stringify(baseRole.current) !== JSON.stringify(role);

  return {
    setRole,
    role,
    checkErrors,
    handleSubmit,
    loading,
    canSubmit,
    submitModalProps,
    t,
    baseRole,
  };
};
