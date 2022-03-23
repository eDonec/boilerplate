import { useCallback, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import objectEqual from 'core-utils/src/objectEqual';

import { AppDispatch, RootState } from '_redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFN = objectEqual
) => {
  return useSelector(selector, equalityFN);
};

export const useLoading = () => {
  const [loadingProcesses, setIsLoading] = useState(0);

  const startLoading = useCallback(() => {
    setIsLoading((prev) => (prev += 1));
  }, []);
  const stopLoading = useCallback(() => {
    setIsLoading((prev) => Math.max(prev - 1, 0));
  }, []);

  return { startLoading, stopLoading, isLoading: loadingProcesses > 0 };
};

export const useLoadingDispatch = () => {
  const classicDispatch = useAppDispatch();
  const { startLoading, stopLoading, isLoading } = useLoading();

  const dispatch = useCallback(
    async (callback: ThunkAction<unknown, RootState, undefined, AnyAction>) => {
      startLoading();
      const response = await classicDispatch(callback);

      stopLoading();

      return response;
    },
    [classicDispatch, startLoading, stopLoading]
  ) as typeof classicDispatch;

  return {
    isLoading,
    dispatch,
    startLoading,
    stopLoading,
    classicDispatch,
  };
};
