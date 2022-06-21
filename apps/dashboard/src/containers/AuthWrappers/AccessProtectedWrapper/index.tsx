import { clsx } from "core-utils";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import ReactChildrenProps from "shared-types/ReactChildren";

import {
  getPrivilegeName,
  useAccessProtectedWrapper,
} from "./useAccessProtectedWrapper";

export type Privileges = {
  ressource?: ACCESS_RESSOURCES;
  privileges?: PRIVILEGE;
  // TODO: Do something about meta values inside the access object by sending a function or something
};
type IProps = ReactChildrenProps & Privileges & { isExplicit?: boolean };
const AccessProtectedWrapper: React.FC<IProps> = ({
  ressource,
  privileges,
  isExplicit,
  children,
}) => {
  const { isAccessible } = useAccessProtectedWrapper(ressource, privileges);

  if (isAccessible) return <>{children}</>;

  return isExplicit ? (
    <div
      className={clsx(
        "rounded-md border-2 border-red-400 bg-red-100 p-8 text-center text-red-500 dark:border-red-500 dark:bg-red-200 dark:text-red-800"
      )}
    >
      <div>
        You have no access to this ressource ask the administrator to give you
        at least {getPrivilegeName(privileges)} privilage to {ressource}
      </div>
      <div className="mx-auto mt-4 h-6 w-6 rounded-full border border-red-400 text-center dark:border-red-800">
        i
      </div>
    </div>
  ) : null;
};

export default AccessProtectedWrapper;
