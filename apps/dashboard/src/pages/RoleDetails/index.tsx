import { useTranslation } from "react-i18next";

import { Button } from "core-ui";

import { BaseDataTable } from "data-table";

import { withPrivateWrapper } from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

import { useRoleDetails } from "./useRoleDetails";

const RoleDetails = () => {
  const { ressources, columns } = useRoleDetails();
  const [t] = useTranslation();

  return (
    <MainWrapper
      title="Role Details"
      description="Role Details"
      customButton={<Button success>{t("misc.save")}</Button>}
    >
      <BaseDataTable
        data={ressources}
        columns={columns}
        keyExtractor={({ item }) => item.title}
      />
    </MainWrapper>
  );
};

export default withPrivateWrapper(RoleDetails);
