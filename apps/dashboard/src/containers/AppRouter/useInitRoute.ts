import React, { DependencyList, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { PageProps } from "containers/MainWrapper";

export const useInitRoute = (props: PageProps, deps?: DependencyList) => {
  const initPage =
    useOutletContext<React.Dispatch<React.SetStateAction<PageProps>>>();

  useEffect(() => {
    initPage?.(props);
  }, deps || []);
};
