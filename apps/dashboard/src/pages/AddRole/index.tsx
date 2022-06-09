import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { Button } from "core-ui";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import RoleForm from "containers/RoleForm";

const emptyRole: Partial<LeanRoleDocument> = {
  name: "",
  access: [],
};

const AddRole = () => {
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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          body: { ...role, name: role.name?.trim() },
        });
        baseRole.current = role;
        toast.success("Role added successfully");
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

  useInitRoute(
    {
      description: "Role Creation",
      title: "Role Creation",
      customButton: (
        <Button
          success
          onClick={handleSubmit}
          isLoading={loading}
          disabled={!canSubmit}
        >
          {t("misc.submit")}
        </Button>
      ),
    },
    [loading, canSubmit]
  );

  return (
    <>
      {role && (
        <RoleForm
          checkErrors={checkErrors}
          baseRole={baseRole}
          role={role}
          setRole={setRole}
        />
      )}
      <AlertDialog
        size="small"
        title={t("role.confirmationTitle")}
        message={t("role.confirmationBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default AddRole;
