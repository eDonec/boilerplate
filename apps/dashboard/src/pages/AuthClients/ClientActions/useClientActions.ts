import { useState } from "react";
import toast from "react-hot-toast";

import Api from "api";
import { LeanAuthDocument } from "auth-types/models/Auth";

import { UncontrolledDataTableHandle } from "data-table/InternalUncontrolledDataTable/types";

export const useClientActions = (
  dataTableRef: React.RefObject<UncontrolledDataTableHandle<LeanAuthDocument>>
) => {
  const [isLoading, setIsLoading] = useState<boolean | string>(false);

  const banClient = async (id: string) => {
    if (dataTableRef.current) {
      setIsLoading(id);
      const [data, setData] = dataTableRef.current.useData();

      try {
        setData((prev) => {
          const newData = [...prev.items];
          const index = newData.findIndex((item) => item._id === id);

          newData[index].isBanned = true;

          return { ...prev, items: newData };
        });

        await Api.authSDK.banClient({
          body: { reason: "I just feel like it" },
          params: { id },
        });
      } catch (error) {
        setData(data);
        toast.error((error as Error).message);
      }
    }
    setIsLoading(false);
  };
  const liftBanAndSuspension = async (id: string) => {
    if (dataTableRef.current) {
      setIsLoading(id);
      const [data, setData] = dataTableRef.current.useData();

      try {
        setData((prev) => {
          const newData = [...prev.items];
          const index = newData.findIndex((item) => item._id === id);

          newData[index].isBanned = false;
          newData[index].isSuspended = false;

          return { ...prev, items: newData };
        });

        await Api.authSDK.liftBanAndSuspension({
          params: { id },
        });
        toast.success("Ban and suspension lifted on client!");
      } catch (error) {
        setData(data);
        toast.error((error as Error).message);
      }
      setIsLoading(false);
    }
  };

  const suspendClient = async (
    id: string,
    reason: string,
    suspensionLiftTime: Date
  ) => {
    if (dataTableRef.current) {
      setIsLoading(id);
      const [data, setData] = dataTableRef.current.useData();

      try {
        setData((prev) => {
          const newData = [...prev.items];
          const index = newData.findIndex((item) => item._id === id);

          newData[index].isSuspended = true;
          newData[index].suspensionLiftTime = suspensionLiftTime;
          newData[index].suspensionReason = reason;

          return { ...prev, items: newData };
        });

        await Api.authSDK.suspendClient({
          params: { id },
          body: {
            suspensionLiftTime,
            reason,
          },
        });
        toast.success("User suspended successfuly!");
      } catch (error) {
        setData(data);
        toast.error((error as Error).message);
      }
      setIsLoading(false);
    }
  };

  return {
    banClient,
    liftBanAndSuspension,
    suspendClient,
    isLoading,
  };
};
