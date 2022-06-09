import { useTranslation } from "react-i18next";

import { Button } from "core-ui";
import AlertDialog from "core-ui/AlertDialog";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import RoleForm from "containers/RoleForm";

import { useEditRole } from "./useEditRole";

const EditRole = () => {
  const [t] = useTranslation();

  const {
    loading,
    baseRole,
    handleSubmit,
    canSubmit,
    role,
    setRole,
    submitModalProps,
  } = useEditRole();

  useInitRoute(
    {
      description: baseRole.current?.name
        ? `Editing ${baseRole.current.name}`
        : "Role Details",
      title: "Edit Role",
      customButton: (
        <Button
          success
          onClick={handleSubmit}
          isLoading={loading}
          disabled={!canSubmit}
        >
          {t("misc.save")}
        </Button>
      ),
    },
    [loading, canSubmit, baseRole.current?.name]
  );

  return (
    <>
      {role && (
        <RoleForm
          checkErrors
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

export default EditRole;
