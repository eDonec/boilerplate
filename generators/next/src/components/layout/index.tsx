import * as React from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  // Put Header or Footer Here
  return <>{children}</>;
};

export default Layout;
