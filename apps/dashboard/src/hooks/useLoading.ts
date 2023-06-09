import { useState } from "react";

const useLoading = (initialState = 0) => {
  const [loadingProcesses, setIsLoading] = useState(initialState);

  const startLoading = () => {
    setIsLoading((prev) => prev + 1);
  };
  const stopLoading = () => {
    setIsLoading((prev) =>
      Math.max(prev - 1 === initialState ? 0 : prev - 1, 0)
    );
  };

  return { startLoading, stopLoading, isLoading: loadingProcesses > 0 };
};

export default useLoading;
