import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAccessMatcher, useAuthClient } from "authenticator";

import { Routes, routes } from "./routes";
import {
  findAccessibleRoutes,
  getRouteIconFromPathName,
  searchRoutes,
} from "./routeUtils";

export const useMainWrapper = () => {
  const { pathname } = useLocation();
  const [filteredRoutes, setFilteredRoutes] = useState<Routes>([]);
  const authClient = useAuthClient();
  const accessMatcher = useAccessMatcher();
  const handleChange = (value: string) => {
    setFilteredRoutes(
      findAccessibleRoutes(searchRoutes(value.trim()), accessMatcher)
    );
  };
  const currentRouteIcon = getRouteIconFromPathName(pathname);

  useEffect(() => {
    setFilteredRoutes(findAccessibleRoutes(routes, accessMatcher));
  }, [authClient]);

  return { handleChange, filteredRoutes, currentRouteIcon };
};
