import { createSlice } from '@reduxjs/toolkit';

import { setCounterAsync } from './thunk';

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.count++;
    },
    decrementCounter: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCounterAsync.fulfilled, (state, { payload }) => {
      state.count = payload;
    });
  },
});

export const { incrementCounter, decrementCounter } = counterSlice.actions;

export default counterSlice.reducer;
