import { useEffect, useState } from "react";

const DEFAULT_DELAY = 200;

const useDebounce = <T>(
  debounceResolutionCallback: (value: T | undefined) => void,
  delay: number = DEFAULT_DELAY
) => {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debounceResolutionCallback(debouncedValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue, delay]);

  return setDebouncedValue;
};

export default useDebounce;
