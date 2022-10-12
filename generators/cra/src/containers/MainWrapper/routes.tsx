import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import DashboardIcon from "components/Icons/DashboardIcon";
import { Privileges } from "containers/AuthWrappers/AccessProtectedWrapper";

import { LinkTranslator } from "./Breadcrumbs/useBreadcrumbs";

export const routes: Routes = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Home",
        to: "/",
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Configuration",
    links: [
      {
        title: "Health checks",
        to: "/health",
        Icon: DashboardIcon,
        privileges: {
          ressource: ACCESS_RESSOURCES.MICROSERVICE_STATUS,
          privileges: PRIVILEGE.READ,
        },
      },
    ],
  },
];

export type UnseenNotification = {
  numberOfUnseenNotifications: number;
  route: "Home" | "Roles" | "Authenticated Clients";
};

export type Routes = {
  title: string;
  privileges?: Privileges;
  links: {
    title: string;
    to: keyof LinkTranslator;
    privileges?: Privileges;
    Icon: typeof DashboardIcon;
  }[];
}[];
