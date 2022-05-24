import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const pathList = pathname
    .split("/")
    .filter((path) => path !== "") as (keyof typeof linkTranslator)[];

  const currentPath = pathList.pop();
  const firstPath: keyof typeof linkTranslator = "/";

  return { firstPath, pathList, currentPath };
};

export const linkTranslator = {
  "/": "Dashboard",
  edit: "Modifier",
  add: "Creer",
};
