import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const [t] = useTranslation();
  const linkTranslator = {
    "/": t("linksNames.dashboard"),
    edit: t("linksNames.edit"),
    add: t("linksNames.add"),
  };
  const { pathname } = useLocation();

  // TODO: FIX THIS STUPID THING
  const pathList = pathname
    .split("/")
    .filter((path) => path !== "") as (keyof typeof linkTranslator)[];

  const currentPath = pathList.pop();
  const firstPath: keyof typeof linkTranslator = "/";

  return { firstPath, pathList, currentPath, linkTranslator };
};
