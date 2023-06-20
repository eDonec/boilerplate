import * as React from "react";

import { clsx } from "core-utils";
import ReactChildrenProps from "shared-types/ReactChildren";

const Layout: React.FC<
  ReactChildrenProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ children, className, ...props }) => {
  // Put Header or Footer Here
  return (
    <div
      className={clsx("container mx-auto px-4 md:px-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Layout;
