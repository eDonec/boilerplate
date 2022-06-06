import Api from "api";
import { LeanAuthDocument } from "auth-types/models/Auth";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import { withPrivateWrapper } from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

const dataColumns: DataTableColumn<LeanAuthDocument>[] = [
  { selector: "_id", title: "ID" },
  {
    selector: "email",
    title: "Email",
  },
  { selector: "userName", title: "User Name" },
  {
    selector: "role.name",
    title: "Role",
  },
  {
    selector: "authType",
    title: "User or App",
  },
  {
    title: "Banned or suspended?",
    cell: (item) =>
      item.isBanned || item.isSuspended ? (
        <span className="text-red-400">Yes</span>
      ) : (
        <span className="text-sm">No</span>
      ),
  },
];

const fetchFunction: FetchFunction<LeanAuthDocument> = (args) =>
  Api.authSDK.getAuthenticatedClients({ query: args });

const AuthClients = () => (
  <MainWrapper
    title="Authenticated Clients"
    description="List of authenticated clients"
  >
    <UncontrolledDataTable
      fetchFunction={fetchFunction}
      columns={dataColumns}
      keyExtractor={({ item }) => item._id}
    />
  </MainWrapper>
);

export default withPrivateWrapper(AuthClients);
