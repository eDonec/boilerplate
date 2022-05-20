import React from "react";

import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import DashboardIcon from "components/Sidebar/Icons/DashboardIcon";

export const routes: Routes = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Home",
        to: "/",
        privileges: [],
        Icon: <DashboardIcon />,
      },
    ],
  },
  {
    title: "Configuration",
    links: [
      {
        title: "Acces",
        to: "/roles",
        privileges: [
          {
            ressource: ACCESS_RESSOURCES.ROLE,
            previlages: [],
          },
        ],
        Icon: <DashboardIcon />,
      },
    ],
  },
];

type Routes = {
  title: string;
  privileges?: {
    ressource: ACCESS_RESSOURCES;
    previlages: PRIVILEGE | PRIVILEGE[];
  };
  links: {
    title: string;
    to: string;
    privileges: {
      ressource: ACCESS_RESSOURCES;
      previlages: PRIVILEGE | PRIVILEGE[];
    }[];
    Icon: React.ReactNode;
  }[];
}[];
