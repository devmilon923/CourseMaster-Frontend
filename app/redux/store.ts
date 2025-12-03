import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
