import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";

import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

import { useAccessPage } from "./useAccessPage";

const fetchFunction: FetchFunction<LeanRoleDocument> = (args) =>
  Api.authSDK.getRoles({ query: args });

const AccessPage = () => {
  const { dataColumns } = useAccessPage();

  return (
    <PrivateWrapper>
      <MainWrapper title="Roles" description="Role management">
        <UncontrolledDataTable
          fetchFunction={fetchFunction}
          columns={dataColumns}
          keyExtractor={({ item }) => item._id}
        />
      </MainWrapper>
    </PrivateWrapper>
  );
};

export default AccessPage;
