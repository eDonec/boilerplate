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
];

export type UnseenNotification = {
  numberOfUnseenNotifications: number;
  route: "Home";
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
