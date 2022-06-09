import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useFirstMount } from "core-hooks";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

export const useEditRole = () => {
  const isFirstMount = useFirstMount();
  const [role, setRole] = useState<Partial<LeanRoleDocument> | null>(null);
  const baseRole = useRef<Partial<LeanRoleDocument> | null>(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  if (!baseRole.current && role) baseRole.current = role;

  const canSubmit =
    JSON.stringify(baseRole.current) !== JSON.stringify(role) &&
    role?.name?.trim();

  const onSubmit = async () => {
    if (role && canSubmit) {
      setLoading(true);
      try {
        await Api.authSDK.updateRole({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          params: { id: id! },
          body: { ...role, name: role.name?.trim() },
        });
        baseRole.current = role;
        toast.success("Role updated successfully");
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

  if (isFirstMount && id) {
    Api.authSDK.getRoleById({ params: { id } }).then(setRole);
  }

  return {
    loading,
    baseRole,
    handleSubmit,
    canSubmit,
    role,
    setRole,
    submitModalProps,
  };
};
