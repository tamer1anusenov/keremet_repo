import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Add other reducers here as needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
