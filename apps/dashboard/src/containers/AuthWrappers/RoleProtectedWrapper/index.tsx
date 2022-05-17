import ReactChildrenProps from "shared-types/ReactChildren";

import { useRoleProtectedWrapper } from "./useRoleProtectedWrapper";

type IProps = ReactChildrenProps & {
  role: string;
};
const AccessProtectedWrapper: React.FC<IProps> = ({ role, children }) => {
  const { isAccessible } = useRoleProtectedWrapper({ role });

  if (isAccessible) return <>{children}</>;

  return null;
};

export default AccessProtectedWrapper;
