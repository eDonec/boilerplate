import { useTranslation } from "react-i18next";

import { Button } from "core-ui";
import AlertDialog from "core-ui/AlertDialog";

import { BaseDataTable } from "data-table";

import { useInitRoute } from "containers/AppRouter/useInitRoute";

import { useRoleDetails } from "./useRoleDetails";

const RoleDetails = () => {
  const {
    ressources,
    columns,
    highlightDisabledRoutes,
    submitModalProps,
    handleSubmit,
    loading,
    canSubmit,
  } = useRoleDetails();
  const [t] = useTranslation();

  useInitRoute(
    {
      description: "Role Details",
      title: "Roles",
      customButton: (
        <Button
          disabled={!canSubmit}
          isLoading={loading}
          success
          onClick={handleSubmit}
        >
          {t("misc.save")}
        </Button>
      ),
    },
    [loading, canSubmit]
  );

  return (
    <>
      <BaseDataTable
        conditionalRowClassName={highlightDisabledRoutes}
        data={ressources}
        columns={columns}
        keyExtractor={({ item }) => item.title}
      />
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

export default RoleDetails;
