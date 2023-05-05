import React from "react";

import { SideBarProvider } from "contexts/SideBarContext";

import MobileSidebar from "./mobile";
import WebNavbar from "./web";
const links = [
  { href: "/", title: "Accueil" },
  { href: "/blogs", title: "Nos Articles" },
];

const Navbar = () => {
  return (
    <SideBarProvider>
      <section className="top-0 z-50 md:sticky ">
        <WebNavbar links={links} />
        <MobileSidebar links={links} />
      </section>
    </SideBarProvider>
  );
};

export default Navbar;
