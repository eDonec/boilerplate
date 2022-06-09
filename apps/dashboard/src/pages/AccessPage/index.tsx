import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import ButtonLink from "core-cra-components/ButtonLink";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { accessPageColumns } from "./accessPageColumns";

const fetchFunction: FetchFunction<LeanRoleDocument> = (args) =>
  Api.authSDK.getRoles({ query: args });

const AccessPage = () => {
  useInitRoute({
    description: "Role management",
    title: "Roles",
    customButton: (
      <AccessProtectedWrapper
        privileges={PRIVILEGE.WRITE}
        ressource={ACCESS_RESSOURCES.ROLE}
      >
        <ButtonLink to="roles/add" soft primary>
          Add New Role
        </ButtonLink>
      </AccessProtectedWrapper>
    ),
  });

  return (
    <UncontrolledDataTable
      fetchFunction={fetchFunction}
      columns={accessPageColumns}
      keyExtractor={({ item }) => item._id}
    />
  );
};

export default AccessPage;
