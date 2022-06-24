import { Link, Outlet, useOutletContext } from "react-router-dom";

import { clsx } from "core-utils";
import formatRelative from "date-fns/formatRelative";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { formatDuration } from "helpers/formatDuration";
import { toPropperCase } from "helpers/toProperCase";

import { useHealth } from "./useHealth";

const Health = () => {
  const { isLoading, microserviceStatuses } = useHealth();
  const outletContext = useOutletContext();

  return (
    <AccessProtectedWrapper
      privileges={PRIVILEGE.READ}
      ressource={ACCESS_RESSOURCES.MICROSERVICE_STATUS}
      isExplicit
    >
      <div className="mt-10 flex justify-between">
        {isLoading || !microserviceStatuses ? (
          <div>Loading...</div>
        ) : (
          <div className="flex h-[300px] flex-wrap justify-center gap-4 dark:text-gray-200 md:justify-start ">
            {microserviceStatuses.map(
              ({ microserviceName, health, _id, uptime, lastHealthCheck }) => (
                <Link
                  to={microserviceName}
                  key={_id.toString()}
                  className={clsx(
                    "relative max-w-[100%] rounded border p-4 shadow-lg dark:border-gray-500 dark:shadow-gray-800 md:w-48"
                  )}
                >
                  <h3 className="pb-4 text-center">
                    {toPropperCase(microserviceName)}
                  </h3>
                  <div className="flex justify-center">
                    {health === "OK" ? (
                      <div
                        className={clsx(
                          "dark:bg-success-600 dark:text-success-600 text-success-500 bg-success-500 animate-status-dot relative inline-block h-8 w-8 transform-none self-center rounded-full p-2 align-middle"
                        )}
                      />
                    ) : (
                      <div
                        className={clsx(
                          "dark:bg-danger-600 dark:text-danger-600 text-danger-500 bg-danger-500 animate-status-dot relative inline-block h-8 w-8 transform-none self-center rounded-full p-2 align-middle"
                        )}
                      />
                    )}
                  </div>
                  <h4 className="pt-4 text-center">{health}</h4>
                  <h5 className="wrap pt-4 text-center">
                    {health === "OK" ? (
                      <>
                        Service up for:{" "}
                        <strong className="font-bold">
                          {formatDuration(uptime * 1000)}
                        </strong>
                      </>
                    ) : (
                      "Service down"
                    )}
                  </h5>
                  <div className="absolute bottom-0 right-0 m-4 text-right">
                    Last updated:
                    <br />
                    {formatRelative(new Date(lastHealthCheck), new Date())}
                  </div>
                </Link>
              )
            )}
          </div>
        )}
        <div>
          <Outlet context={outletContext} />
        </div>
      </div>
    </AccessProtectedWrapper>
  );
};

export default Health;
