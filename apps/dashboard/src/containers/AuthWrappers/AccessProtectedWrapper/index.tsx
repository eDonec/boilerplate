import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useAccessProtectedWrapper } from "./useAccessProtectedWrapper";

export type Privileges = {
  ressource?: ACCESS_RESSOURCES;
  privileges?: PRIVILEGE | PRIVILEGE[];
  // TODO: Do something about meta values inside the access object by sending a function or something
};
type IProps = ReactChildrenProps & Privileges;
const AccessProtectedWrapper: React.FC<IProps> = ({
  ressource,
  privileges,
  children,
}) => {
  const { isAccessible } = useAccessProtectedWrapper(ressource, privileges);

  if (isAccessible) return <>{children}</>;

  return null;
};

export default AccessProtectedWrapper;
