import React from "react";

import { AuthGuarded, useAuthClient } from "authenticator";
import { useSideBarContext } from "contexts/SideBarContext";
import { UnstyledLink } from "core-next-components";

import AppLogo from "components/svgs/AppLogo/indesx";
import BurgerMenuSVG from "components/svgs/BurgerMenuSVG";

import ProfileAvatar from "./ProfileAvatar";
import { ILink } from "../NavbarLink";
import NavbarLinkList from "../NavbarLinkList";

const WebNavbar = ({ links }: { links: ILink[] }) => {
  const { setIsSideBarOpen } = useSideBarContext();
  const authClient = useAuthClient();

  function handleOpenSidebar() {
    setIsSideBarOpen(true);
  }

  return (
    <div className="left-0 right-0 top-0 mx-auto bg-white/30 px-4 shadow-lg backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <UnstyledLink
          aria-label="Go to homepage"
          className="text-3xl font-semibold leading-none"
          href="/"
        >
          <AppLogo className="h-16 fill-gray-800" />
        </UnstyledLink>
        <div className="lg:hidden">
          <button
            onClick={handleOpenSidebar}
            className="navbar-burger flex items-center rounded border  border-white bg-gradient-to-r from-[#2f86a6] via-[#77769f] to-[#ea8294] px-3 py-2 text-white hover:border-blue-300 hover:text-blue-700"
          >
            <BurgerMenuSVG />
          </button>
        </div>
        <ul className="hidden lg:flex lg:w-auto lg:items-center lg:space-x-12">
          <NavbarLinkList links={links} />
        </ul>
        <div className="hidden lg:block">
          {authClient ? (
            <ProfileAvatar authClient={authClient} />
          ) : (
            <AuthGuarded>
              <div className="mr-2 inline-block rounded border border-primary-400 px-4 py-3 text-xs font-semibold leading-none text-primary-600 hover:border-primary-700 hover:text-primary-700">
                Se connecter
              </div>
            </AuthGuarded>
          )}
        </div>
      </nav>
    </div>
  );
};

export default WebNavbar;
