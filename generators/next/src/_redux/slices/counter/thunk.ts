import { createAsyncThunk } from '@reduxjs/toolkit';

export const setCounterAsync = createAsyncThunk(
  'counter/setCounterAsync',
  async (newCount: number) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    return newCount;
  }
);
