import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useFirstMount } from "core-hooks";

import { toPropperCase } from "helpers/toProperCase";

export type LinkTranslator = {
  "/": string;
  "/edit": string;
  "/add": string;
  "/authenticated-clients": string;
  "/roles": string;
};
export const useBreadcrumbs = (
  overrideBreadcrumbs?: { name: string; path: string }[]
) => {
  const [t] = useTranslation();
  const linkTranslator: LinkTranslator = {
    "/": t("linksNames.dashboard"),
    "/edit": t("misc.edit"),
    "/add": t("misc.add"),
    "/authenticated-clients": t("linksNames.authenticatedClients"),
    "/roles": t("linksNames.roles"),
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isFirstMount = useFirstMount();

  const pathList =
    overrideBreadcrumbs ||
    (
      pathname
        .split("/")
        .filter((path) => path !== "")
        .map((p) => `/${p}`) as (keyof typeof linkTranslator)[]
    ).reduce<
      {
        path: string;
        name: typeof linkTranslator[keyof typeof linkTranslator];
      }[]
    >((pathOutputAcc, currentPath) => {
      if (
        !linkTranslator[currentPath] &&
        !isFirstMount &&
        process.env.NODE_ENV === "development"
      )
        // eslint-disable-next-line no-console
        console.error(
          `@eDonec Error (Please do not ship to production!): /${currentPath} Link is not defined in linkTranslator, apps/dashboard/src/containers/MainWrapper/Breadcrumbs/useBreadcrumbs.ts`
        );

      const pathFinder = {
        name:
          linkTranslator[currentPath] ||
          toPropperCase(currentPath.replace("/", "")),
        path: `${
          pathOutputAcc[pathOutputAcc.length - 1]?.path || ""
        }/${currentPath}`,
      };

      return [...pathOutputAcc, pathFinder];
    }, []);

  const pathListCopy = [...pathList];

  const currentPath = pathListCopy.pop();
  const firstPath = {
    name: linkTranslator["/"],
    path: "/",
  };

  return {
    firstPath,
    pathList: pathListCopy,
    currentPath,
    linkTranslator,
    navigate,
  };
};
