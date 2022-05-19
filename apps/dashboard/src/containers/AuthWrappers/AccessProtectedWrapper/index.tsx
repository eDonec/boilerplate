import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useAccessProtectedWrapper } from "./useAccessProtectedWrapper";

type IProps = ReactChildrenProps & {
  ressource: ACCESS_RESSOURCES;
  previlages: PRIVILEGE | PRIVILEGE[];
  // TODO: Do something about meta values inside the access object by sending a function or something
};
const AccessProtectedWrapper: React.FC<IProps> = ({
  ressource,
  previlages,
  children,
}) => {
  const { isAccessible } = useAccessProtectedWrapper(ressource, previlages);

  if (isAccessible) return <>{children}</>;

  return null;
};

export default AccessProtectedWrapper;
