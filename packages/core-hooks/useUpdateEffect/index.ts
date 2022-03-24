import { useEffect } from "react";

import useFirstMount from "../useFirstMount";

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMount();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
