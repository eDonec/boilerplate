import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import DashboardIcon from "components/Icons/DashboardIcon";
import { Privileges } from "containers/AuthWrappers/AccessProtectedWrapper";

import { LinkTranslator } from "./Breadcrumbs/useBreadcrumbs";

export const routes: Routes = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Health",
        to: "/",
        Icon: DashboardIcon,
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
          ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
          privileges: PRIVILEGE.READ,
        },
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Blogs",
    links: [
      {
        title: "Blogs",
        to: "/blogs",
        privileges: {
          ressource: ACCESS_RESSOURCES.BLOGS,
          privileges: PRIVILEGE.READ,
        },
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Categories",
    links: [
      {
        title: "Categories",
        to: "/categories",
        privileges: {
          ressource: ACCESS_RESSOURCES.CATEGORY,
          privileges: PRIVILEGE.READ,
        },
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Configuration",
    links: [
      {
        title: "Roles",
        to: "/roles",
        privileges: {
          ressource: ACCESS_RESSOURCES.ROLE,
        },
        Icon: DashboardIcon,
      },
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
  route: "Home" | "Roles" | "Authenticated Clients" | "Documents";
};

export type Routes = {
  title: string;
  privileges?: Privileges;
  links: {
    title: string;
    to: keyof LinkTranslator;
    privileges?: Privileges;
    Icon: typeof DashboardIcon;
    notificationCountGetter?: () => Promise<{ count: number }>;
  }[];
}[];
