import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import {
  DataTableColumn,
  FetchFunction,
} from "core-cra-components/UncontrolledDataTable/types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";

const dataColumns: DataTableColumn<LeanRoleDocument>[] = [
  {
    selector: "name",
    title: "Role",
  },
];

const fetchFunction: FetchFunction<LeanRoleDocument> = (args) =>
  Api.authSDK.getRoles({ query: args });

const AccessPage = () => {
  useInitRoute({ description: "Role management", title: "Roles" });

  return (
    <UncontrolledDataTable
      fetchFunction={fetchFunction}
      columns={dataColumns}
      keyExtractor={({ item }) => item._id}
    />
  );
};

export default AccessPage;
