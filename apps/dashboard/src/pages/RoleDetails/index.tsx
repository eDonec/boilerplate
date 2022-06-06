import { useState } from "react";
import { useParams } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useFirstMount } from "core-hooks";

import { withPrivateWrapper } from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

const RoleDetails = () => {
  const [role, setRole] = useState<LeanRoleDocument | null>(null);
  const isFirstMount = useFirstMount();
  const { id } = useParams<{ id: string }>();

  if (isFirstMount && id) {
    Api.authSDK.getRoleById({ params: { id } }).then(setRole);
  }

  return (
    <MainWrapper title="Role Details" description="Role Details">
      {JSON.stringify(role)}
    </MainWrapper>
  );
};

export default withPrivateWrapper(RoleDetails);
