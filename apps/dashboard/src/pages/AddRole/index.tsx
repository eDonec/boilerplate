import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { LeanRoleDocument } from "auth-types/models/Role";
import { Button } from "core-ui";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";

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
  const [submitModalProps, handleSubmit] = useAlertDialog(() => null);
  const [loading] = useState(false);

  const canSubmit =
    JSON.stringify(baseRole.current) !== JSON.stringify(role) &&
    role?.name?.trim();

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
      {role && <RoleForm baseRole={baseRole} role={role} setRole={setRole} />}
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
