import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

const useDebounce = <T>(
  debounceResolutionCallback: (value: T) => void,
  delay: number = DEFAULT_DELAY
) => {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(
    undefined
  );
  const updateDebouncedValue = (value: T) => {
    setDebouncedValue(value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedValue !== undefined) {
        debounceResolutionCallback(debouncedValue);
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue, delay, debounceResolutionCallback]);

  return updateDebouncedValue;
};

export default useDebounce;
