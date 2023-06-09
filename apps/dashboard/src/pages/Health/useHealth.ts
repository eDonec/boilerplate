import { useState } from "react";
import toast from "react-hot-toast";

import Api from "api";
import { useFirstMount } from "core-hooks";
import { LeanMicroServiceStatusDocument } from "health-types/models/MicroserviceStatus";

import useLoading from "hooks/useLoading";

export const useHealth = () => {
  const isFirstMount = useFirstMount();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [microserviceStatuses, setMicroserviceStatuses] =
    useState<LeanMicroServiceStatusDocument[]>();

  if (isFirstMount) {
    startLoading();
    Api.healthSDK
      .getMicroservicesStatus({})
      .then((res) => {
        setMicroserviceStatuses(res);
        stopLoading();
      })
      .catch((error) => {
        toast.error((error as Error).message);
      });
  }

  return {
    isLoading,
    microserviceStatuses,
  };
};
