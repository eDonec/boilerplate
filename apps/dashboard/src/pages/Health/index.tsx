import { Link, Outlet, useOutletContext } from "react-router-dom";

import { clsx } from "core-utils";
import formatRelative from "date-fns/formatRelative";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { formatDuration } from "helpers/formatDuration";
import { toPropperCase } from "helpers/toProperCase";

import { useHealth } from "./useHealth";

const Health = () => {
  const { microserviceStatuses } = useHealth();
  const outletContext = useOutletContext();

  return (
    <AccessProtectedWrapper
      privileges={PRIVILEGE.READ}
      ressource={ACCESS_RESSOURCES.MICROSERVICE_STATUS}
      isExplicit
    >
      <div className="mt-10 flex flex-wrap">
        {!microserviceStatuses ? (
          <div>Loading...</div>
        ) : (
          <div className="my-10 grid flex-1 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 dark:text-gray-200">
            {microserviceStatuses.map(
              ({ microserviceName, health, _id, uptime, lastHealthCheck }) => (
                <div
                  key={_id.toString()}
                  className={clsx(
                    "relative rounded border p-4 shadow-lg dark:border-gray-500 dark:shadow-gray-800 "
                  )}
                >
                  <Link to={microserviceName}>
                    <h3 className="mb-4 text-center">
                      {toPropperCase(microserviceName)}
                    </h3>
                    <div className="flex justify-center">
                      {health === "OK" ? (
                        <div
                          className={clsx(
                            "animate-status-dot relative inline-block h-8 w-8 transform-none self-center rounded-full bg-success-500 p-2 align-middle text-success-500 dark:bg-success-600 dark:text-success-600"
                          )}
                        />
                      ) : (
                        <div
                          className={clsx(
                            "animate-status-dot relative inline-block h-8 w-8 transform-none self-center rounded-full bg-danger-500 p-2 align-middle text-danger-500 dark:bg-danger-600 dark:text-danger-600"
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
                    <div className="mt-4 text-right">
                      Last updated:
                      <br />
                      {formatRelative(new Date(lastHealthCheck), new Date())}
                    </div>
                  </Link>
                </div>
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
