import { useEffect, useState } from "react";

const DEFAULT_DELAY = 200;

const useDebounce = <T>(
  debounceResolutionCallback: (value: T) => void,
  delay: number = DEFAULT_DELAY
) => {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(
    undefined
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedValue !== undefined)
        debounceResolutionCallback(debouncedValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue, delay]);

  return setDebouncedValue;
};

export default useDebounce;
