import { configureStore } from '@reduxjs/toolkit';

import slices from './slices';

const store = configureStore({
  reducer: slices,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
