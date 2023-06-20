import React from "react";

import { useSideBarContext } from "contexts/SideBarContext";

import NavbarLink, { ILink } from "./NavbarLink";

const NavbarLinkList = ({ links }: { links: ILink[] }) => {
  const { setIsSideBarOpen } = useSideBarContext();

  function handleCloseSidebar() {
    setIsSideBarOpen(false);
  }

  return (
    <>
      {links.map((link) => (
        <NavbarLink
          onClick={handleCloseSidebar}
          href={link.href}
          title={link.title}
          key={link.href}
        />
      ))}
    </>
  );
};

export default NavbarLinkList;
