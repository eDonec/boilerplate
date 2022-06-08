import { useTranslation } from "react-i18next";

import { Button } from "core-ui";
import AlertDialog from "core-ui/AlertDialog";

import { BaseDataTable } from "data-table";

import { withPrivateWrapper } from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

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

  return (
    <MainWrapper
      title="Role Details"
      description="Role Details"
      customButton={
        <Button
          disabled={!canSubmit}
          isLoading={loading}
          success
          onClick={handleSubmit}
        >
          {t("misc.save")}
        </Button>
      }
    >
      <BaseDataTable
        conditionalRowClassName={highlightDisabledRoutes}
        data={ressources}
        columns={columns}
        keyExtractor={({ item }) => item.title}
      />
      <AlertDialog
        title={t("role.confirmationTitle")}
        message={t("role.confirmationBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </MainWrapper>
  );
};

export default withPrivateWrapper(RoleDetails);
