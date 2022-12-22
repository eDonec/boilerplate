import { Button } from "core-ui";
import AlertDialog from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import RoleForm from "containers/RoleForm";

import { useEditRole } from "./useEditRole";

const EditRole = () => {
  const {
    loading,
    baseRole,
    handleSubmit,
    canSubmit,
    role,
    setRole,
    submitModalProps,
    t,
    isFormReadOnly,
  } = useEditRole();

  useInitRoute(
    {
      description: baseRole.current?.name
        ? `${isFormReadOnly ? "Viewing" : "Editing"} ${baseRole.current.name}`
        : "Role Details",
      title: `${isFormReadOnly ? "View" : "Edit"} Role`,
      customButton: isFormReadOnly ? undefined : (
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
            {t("misc.save")}
          </Button>
        </AccessProtectedWrapper>
      ),
      overrideBreadcrumbs: [
        {
          name: t("linksNames.roles"),
          path: "/roles",
        },
        {
          name: `${isFormReadOnly ? "" : t("misc.edit")} "${
            baseRole.current?.name ?? "loading..."
          }"`,
          path: "/roles/edit",
        },
      ],
    },
    [loading, canSubmit, baseRole.current?.name]
  );

  return (
    <>
      {role && (
        <RoleForm
          isFormReadOnly={isFormReadOnly}
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
