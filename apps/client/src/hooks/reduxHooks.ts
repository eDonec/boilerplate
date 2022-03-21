import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { objectEqual } from 'helpers/objectEqual';

import { AppDispatch, RootState } from '_redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFN = objectEqual
) => {
  return useSelector(selector, equalityFN);
};
