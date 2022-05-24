import React from "react";

import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import DashboardIcon from "components/Sidebar/Icons/DashboardIcon";
import { Privileges } from "containers/AuthWrappers/AccessProtectedWrapper";

export const routes: Routes = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Home",
        to: "/",
        Icon: <DashboardIcon />,
      },
    ],
  },
  {
    title: "Clients",
    links: [
      {
        title: "Authenticated Clients",
        to: "/authenticated-clients",
        privileges: {
          ressource: ACCESS_RESSOURCES.USER,
          privileges: [PRIVILEGE.READ],
        },
        Icon: <DashboardIcon />,
      },
    ],
  },
  {
    title: "Configuration",
    links: [
      {
        title: "Access",
        to: "/roles",
        privileges: {
          ressource: ACCESS_RESSOURCES.ROLE,
        },
        Icon: <DashboardIcon />,
      },
    ],
  },
];

export type UnseenNotification = {
  numberOfUnseenNotifications: number;
  route: "Home" | "Access";
};

export type Routes = {
  title: string;
  privileges?: Privileges;
  links: {
    title: string;
    to: string;
    privileges?: Privileges;
    Icon: React.ReactNode;
  }[];
}[];
