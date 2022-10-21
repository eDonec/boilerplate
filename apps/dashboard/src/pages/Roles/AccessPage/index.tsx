import ButtonLink from "core-cra-components/ButtonLink";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import AlertDialog from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { useAccessPage } from "./useAccessPage";

const AccessPage = () => {
  const { t, deleteModalProps, dataTableRef, columns, fetchFunction } =
    useAccessPage();

  useInitRoute({
    description: "Role management",
    title: "Roles",
    customButton: (
      <AccessProtectedWrapper
        privileges={PRIVILEGE.WRITE}
        ressource={ACCESS_RESSOURCES.ROLE}
      >
        <ButtonLink to="roles/add" soft primary>
          {t("role.addNewRole")}
        </ButtonLink>
      </AccessProtectedWrapper>
    ),
  });

  return (
    <>
      <UncontrolledDataTable
        showSearch
        fetchFunction={fetchFunction}
        columns={columns}
        keyExtractor={({ item }) => item._id}
        handle={dataTableRef}
      />
      <AlertDialog
        size="small"
        title={t("role.deletionTitle")}
        message={t("role.deletionBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...deleteModalProps}
      />
    </>
  );
};

export default AccessPage;
