import { combineReducers, configureStore } from '@reduxjs/toolkit';

import counter from './reducers/counter';

const combinedReducer = combineReducers({
  counter,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
