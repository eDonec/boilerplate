import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import {
  DataTableColumn,
  FetchFunction,
} from "core-cra-components/UncontrolledDataTable/types";

import MainWrapper from "containers/MainWrapper";

const dataColumns: DataTableColumn<LeanRoleDocument>[] = [
  {
    selector: "name",
    title: "Role",
  },
];

const fetchFunction: FetchFunction<LeanRoleDocument> = (args) =>
  Api.authSDK.getRoles({ query: args });

const AccessPage = () => (
  <MainWrapper title="Roles" description="Role management">
    <UncontrolledDataTable
      fetchFunction={fetchFunction}
      columns={dataColumns}
      keyExtractor={({ item }) => item._id}
    />
  </MainWrapper>
);

export default AccessPage;
