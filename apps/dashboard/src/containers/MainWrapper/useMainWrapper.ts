import { useEffect, useState } from "react";

import { ACCESS } from "shared-types";

import { accessMatcher } from "containers/AuthWrappers/AccessProtectedWrapper/useAccessProtectedWrapper";

import { useAppSelector } from "hooks/reduxHooks";

import { Routes, routes } from "./routes";

export const useMainWrapper = () => {
  const access = useAppSelector(({ auth }) => auth.access);

  const [filteredRoutes, setFilteredRoutes] = useState<Routes>([]);
  const handleChange = (value: string) => {
    setFilteredRoutes(findAccessibleRoutes(searchRoutes(value.trim()), access));
  };

  useEffect(() => {
    setFilteredRoutes(findAccessibleRoutes(routes, access));
  }, [access]);

  return { access, handleChange, filteredRoutes };
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

const findAccessibleRoutes = (searchedRoutes: Routes, access?: ACCESS[]) =>
  access
    ? searchedRoutes
        .filter(({ privileges }) => {
          if (!privileges) return true;

          return accessMatcher(
            access,
            privileges.ressource,
            privileges.privileges
          );
        })
        .map((section) => ({
          ...section,
          links: section.links.filter(({ privileges }) => {
            if (!privileges) return true;

            return accessMatcher(
              access,
              privileges.ressource,
              privileges.privileges
            );
          }),
        }))
        .filter((section) => section.links.length > 0)
    : [];
