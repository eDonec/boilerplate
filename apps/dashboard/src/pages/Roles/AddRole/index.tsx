import { Button } from "core-ui";
import AlertDialog from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import RoleForm from "containers/RoleForm";

import { useAddRole } from "./useAddRole";

const AddRole = () => {
  const {
    setRole,
    role,
    checkErrors,
    handleSubmit,
    loading,
    canSubmit,
    submitModalProps,
    t,
    baseRole,
  } = useAddRole();

  useInitRoute(
    {
      description: "Role Creation",
      title: "Role Creation",
      customButton: (
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.ROLE}
        >
          <Button
            success
            onClick={handleSubmit}
            isLoading={loading}
            disabled={!canSubmit}
          >
            {t("misc.submit")}
          </Button>
        </AccessProtectedWrapper>
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
