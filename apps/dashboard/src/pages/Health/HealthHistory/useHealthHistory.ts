import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Api from "api";
import { useFirstMount } from "core-hooks";
import { StatusRouteTypes } from "health-types/routes/status";
import { MICROSERVICE_LIST } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";

import useLoading from "hooks/useLoading";

export const useHealthHistory = () => {
  const isFirstMount = useFirstMount();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [
    microserviceStatusHistory,
    setMicroserviceStatusHMicroserviceStatusHistory,
  ] = useState<StatusRouteTypes["/status/:name"]["GET"]["response"]>();
  const params = useParams<{ name: keyof typeof MICROSERVICE_LIST }>();
  const navigation = useNavigate();

  if (!params.name || !MICROSERVICE_LIST[params.name]) navigation("/health");
  const [t] = useTranslation();

  useInitRoute(
    {
      title: `${
        params.name ? MICROSERVICE_LIST[params.name] : ""
      } Health History`,
      description: "Health History",
      overrideBreadcrumbs: [
        {
          name: t("linksNames.health"),
          path: "/health",
        },
        {
          name: params.name
            ? `${MICROSERVICE_LIST[params.name]} Health History`
            : "loading...",
          path: "/",
        },
      ],
    },
    [params.name]
  );

  if (isFirstMount && !(!params.name || !MICROSERVICE_LIST[params.name])) {
    startLoading();
    Api.healthSDK
      .getMicroserviceStatusHistoryByName({
        params: { name: params.name },
        query: { page: "1", limit: "50" },
      })
      .then((res) => {
        setMicroserviceStatusHMicroserviceStatusHistory(res);
        stopLoading();
      })
      .catch((error) => {
        toast.error((error as Error).message);
      });
  }

  useEffect(() => {
    if (
      !isFirstMount &&
      !(!params.name || !MICROSERVICE_LIST[params.name]) &&
      microserviceStatusHistory?.microserviceName !== params.name
    ) {
      startLoading();
      Api.healthSDK
        .getMicroserviceStatusHistoryByName({
          params: { name: params.name },
          query: { page: "1", limit: "50" },
        })
        .then((res) => {
          setMicroserviceStatusHMicroserviceStatusHistory(res);
          stopLoading();
        })
        .catch((error) => {
          toast.error((error as Error).message);
        });
    }
  }, [params.name]);

  return {
    isLoading,
    microserviceStatusHistory,
    microserviceName: params.name,
  };
};
