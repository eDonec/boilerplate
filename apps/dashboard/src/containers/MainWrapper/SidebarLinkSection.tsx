import React from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

type Props = {
  title: string;
} & ReactChildrenProps;
const SidebarLinkSection: React.FC<Props> = ({ title, children }) => (
  <>
    <div className="py-3 pl-4 text-gray-50">{title}</div>
    <ul className="pl-4">{children}</ul>
  </>
);

export default SidebarLinkSection;
