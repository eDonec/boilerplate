import { useState } from "react";
import toast from "react-hot-toast";

import Api from "api";
import { useFirstMount } from "core-hooks";
import { LeanMicroServiceStatusDocument } from "health-types/models/MicroserviceStatus";

export const useHealth = () => {
  const isFirstMount = useFirstMount();
  const [microserviceStatuses, setMicroserviceStatuses] =
    useState<LeanMicroServiceStatusDocument[]>();

  if (isFirstMount) {
    Api.healthSDK
      .getMicroservicesStatus({})
      .then((res) => {
        setMicroserviceStatuses(res);
      })
      .catch((error) => {
        toast.error((error as Error).message);
      });
  }

  return {
    microserviceStatuses,
  };
};
