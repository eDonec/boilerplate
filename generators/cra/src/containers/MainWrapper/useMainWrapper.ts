import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "hooks/reduxHooks";

import { Routes, routes } from "./routes";
import {
  findAccessibleRoutes,
  getRouteIconFromPathName,
  searchRoutes,
} from "./routeUtils";

export const useMainWrapper = () => {
  const access = useAppSelector(({ auth }) => auth.access);
  const { pathname } = useLocation();
  const [filteredRoutes, setFilteredRoutes] = useState<Routes>([]);

  const handleChange = (value: string) => {
    setFilteredRoutes(findAccessibleRoutes(searchRoutes(value.trim()), access));
  };
  const currentRouteIcon = getRouteIconFromPathName(pathname);

  useEffect(() => {
    setFilteredRoutes(findAccessibleRoutes(routes, access));
  }, [access]);

  return { access, handleChange, filteredRoutes, currentRouteIcon };
};
