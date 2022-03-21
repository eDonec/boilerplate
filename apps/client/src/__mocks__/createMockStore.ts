import { AnyAction, configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { RootState } from '_redux/store';

export const createMockStore = (
  state: ReducersMapObject<RootState, AnyAction>
) => {
  return configureStore({
    reducer: state,
  });
};
