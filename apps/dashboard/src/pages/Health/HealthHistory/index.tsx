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
            {microserviceName
              ? "loading..."
              : toPropperCase(microserviceName || "")}
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
                    <div className="h-2 w-16 rounded-full bg-success-200  hover:bg-success-500 dark:bg-success-400 dark:hover:bg-success-700" />
                  ) : (
                    <div className="h-2 w-16 rounded-full bg-danger-200  hover:bg-danger-500 dark:bg-danger-400 dark:hover:bg-danger-700" />
                  )}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default HealthHistory;
