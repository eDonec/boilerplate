import { ACCESS } from "shared-types";

import AddIcon from "components/Icons/AddIcon";
import EditIcon from "components/Icons/EditIcon";

// import { accessMatcher } from "containers/AuthWrappers/AccessProtectedWrapper/useAccessProtectedWrapper";
import { Routes, routes } from "./routes";

export const getRouteIconFromPathName = (pathname: string) => {
  let currentRoute: Routes[number]["links"][number] | undefined;

  if (pathname.includes("edit")) return EditIcon;
  if (pathname.includes("add")) return AddIcon;
  routes.forEach((section) => {
    section.links.forEach((link) => {
      if (pathname.includes(link.to)) {
        currentRoute = link;
      }
    });
  });

  return currentRoute?.Icon;
};

export const searchRoutes = (query: string): Routes =>
  query.length === 0
    ? routes
    : routes
        .map((section) => ({
          ...section,
          links: section.links.filter((link) =>
            link.title.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((section) => section.links.length > 0);

export const findAccessibleRoutes = (
  searchedRoutes: Routes,
  accessMatcher: ({ ressource, privileges }: Partial<ACCESS>) => boolean
) =>
  searchedRoutes
    .filter(({ privileges }) => {
      if (!privileges) return true;

      return accessMatcher({
        ressource: privileges.ressource,
        privileges: privileges.privileges,
      });
    })
    .map((section) => ({
      ...section,
      links: section.links.filter(({ privileges }) => {
        if (!privileges) return true;

        return accessMatcher({
          ressource: privileges.ressource,
          privileges: privileges.privileges,
        });
      }),
    }))
    .filter((section) => section.links.length > 0);
