import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

const RoleDetails = () => (
  <PrivateWrapper>
    <MainWrapper title="Role Details" description="Role Details">
      RoleDetails
    </MainWrapper>
  </PrivateWrapper>
);

export default RoleDetails;
