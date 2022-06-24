import format from "date-fns/format";

import { toPropperCase } from "helpers/toProperCase";

import { useHealthHistory } from "./useHealthHistory";

const loadingArray = new Array(50).fill(0);
const HealthHistory = () => {
  const { isLoading, microserviceStatusHistory, microserviceName } =
    useHealthHistory();

  return (
    <table className="ml-4 dark:text-gray-50 md:min-w-[200px]">
      <thead>
        <tr>
          <th colSpan={2} className="text-left">
            Service Name :{" "}
            {isLoading ? "loading..." : toPropperCase(microserviceName || "")}
          </th>
        </tr>
        <tr>
          <th colSpan={2} className="text-left leading-10">
            Current Status:{" "}
            {isLoading ? "loading..." : microserviceStatusHistory?.status}
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? loadingArray.map((_, index) => (
              <tr key={index} className="mt-1 h-2 dark:text-gray-200">
                {index % 10 === 0 && (
                  <td rowSpan={10} className="w-24 align-top">
                    <span className="text-center text-sm">loading...</span>
                  </td>
                )}
                <td>
                  <div className="h-2 w-16 animate-pulse rounded-full bg-gray-400 dark:bg-gray-400 " />
                </td>
              </tr>
            ))
          : microserviceStatusHistory?.history.map((sample, index) => (
              <tr key={sample.id} className="mt-1 h-2 dark:text-gray-200">
                {index % 10 === 0 && (
                  <td rowSpan={10} className="w-24 align-top">
                    <span className="text-center text-sm">
                      {format(new Date(sample.sampleTime), "HH:mm")}
                    </span>
                  </td>
                )}
                <td>
                  {sample.status === "OK" ? (
                    <div className="dark:bg-success-400 hover:bg-success-500 dark:hover:bg-success-700 bg-success-200  h-2 w-16 rounded-full" />
                  ) : (
                    <div className="dark:bg-danger-400 hover:bg-danger-500 dark:hover:bg-danger-700 bg-danger-200  h-2 w-16 rounded-full" />
                  )}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default HealthHistory;
